import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import s from "./RoutineModal.module.scss";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import AddActivityModal from "./AddActivityModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import DropdownField from "../DropdownField/DropdownField";
import toast from "react-hot-toast";
import closeIcon from "../../assets/icons/basicIcons/close-icon.svg";
import { BaseRequest } from "../../services/BaseRequest";

export default function RoutineModal({
  isOpen,
  setIsOpen,
  person,
  weekDay,
  preset,
  setHasToSavePeople,
}) {
  if (!isOpen) return null;
  const { t } = useTranslation();

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activitiesParam, setActivitiesParam] = useState()
  const tipsEnabled = localStorage.getItem("tipsEnabled") === "true";

  async function GetActivityParam() {
    const response = await BaseRequest({
      method: "GET",
      url: `routines/getActivityPresetParams/${preset.id}`,
      isAuth: true,
      setIsLoading,
    });
    if (response.status == 200) {
      setActivitiesParam(response.data);
    }
  }

  useEffect(() => {
    GetActivityParam();
  }, []);

  // items array
  const [items, setItems] = useState([]);
  // items size
  const slotMinutes = 15; // A escala visual continua 15m
  const gridSize = 50;    // Cada slot de 15m tem 50px
  const minPixel = gridSize / slotMinutes; // Valor de 1 minuto em pixels (~3.33px)
  const timeSlots = 96;   // 24h * 4
  const rowHeight = 50;

  const validationSchemaActivityParam = Yup.object().shape({
    activityPresetParam: Yup.mixed().required(t("requiredField")),
  });
  const formikActivityParam = useFormik({
    initialValues: {
      activityPresetParam: "",
    },
    validationSchema: validationSchemaActivityParam,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  function hasOverlap(newItem, items, ignoreId = null) {
    return items.some((item) => {
      if (item.id === ignoreId) return false; // Ignora ele mesmo
      const newStart = newItem.start;
      const newEnd = newItem.start + newItem.duration;
      const existingStart = item.start;
      const existingEnd = item.start + item.duration;
      return newStart < existingEnd && existingStart < newEnd;
    });
  }

async function GetActivityRoutines() {
  const response = await BaseRequest({
    method: "GET",
    isAuth: true,
    url: `routines/getRoutine/${weekDay.dayId}`,
    setIsLoading,
  });

  if (response.status == 200) {
    const stableItems = response.data.sort((a, b) => {
      return new Date(a.createdAt || a.id) - new Date(b.createdAt || b.id);
    });
    
    setItems(stableItems);
  }
}

  useEffect(() => {
    GetActivityRoutines();
  }, [isActivityModalOpen]);

async function RegisterRoutineActivity() {
  await BaseRequest({
    method: "PUT",
    url: `routines/updateRoutineActivities`,
    data: items, 
    isAuth: true,
  });

  const lastEnd = items.length > 0 
    ? Math.max(...items.map(i => i.start + i.duration)) 
    : 0;

  let data = {
    activityPresetParam: formikActivityParam.values.activityPresetParam.id,
    presetId: preset.id,
    dayRoutineId: weekDay.dayId,
    start: lastEnd,
    duration: 10,
  };
  const response = await BaseRequest({
    method: "POST",
    isAuth: true,
    url: `routines/registerEachRoutineActivity`,
    data,
    setIsLoading,
  });

  if (response.status == 201) {
    toast.success(t("toastMessage16"));
    formikActivityParam.resetForm();
    GetActivityRoutines();
  }
}

  const handleDragStop = (e, data, id) => {
    setItems((prevItems) => {
      const newStartInMinutes = Math.max(0, Math.round(data.x / minPixel));
      const currentItem = prevItems.find((item) => item.id === id);
      const newItem = { ...currentItem, start: newStartInMinutes };

      if (hasOverlap(newItem, prevItems, id)) {
        toast.error(t("toastMessage17"));
        return prevItems;
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, start: newStartInMinutes } : item
      );
    });
  };

  const handleResizeStop = (_, { size }, id) => {
    setItems((prevItems) => {
    let newDurationInMinutes = Math.round(size.width / minPixel);
    const currentItem = prevItems.find((item) => item.id === id);
    
    if (currentItem.start + newDurationInMinutes > 1440) {
      newDurationInMinutes = 1440 - currentItem.start;
    }

    const newItem = { ...currentItem, duration: newDurationInMinutes };

      if (hasOverlap(newItem, prevItems, id)) {
        toast.error(t("toastMessage18"));
        GetActivityRoutines()
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, duration: newDurationInMinutes } : item
      );
    });
  };

  async function SaveRoutine(notClose=false) {
    const response = await BaseRequest({
      method: "PUT",
      url: `routines/updateRoutineActivities`,
      data: items,
      setIsLoading,
      isAuth: true,
    });
    if (response.status == 200) {
      setHasToSavePeople(false);
      if(!notClose){
        toast.success(t("toastMessage19"));
      }
      setIsOpen(notClose ? true : false);
    }
  }

  const [deleteActivity, setDeleteActivity] = useState("");
  const DeleteModal = () => {
    if (deleteActivity == {} || deleteActivity == "") return null;
    return (
      <div className={s.deleteModal}>
        <h5>Deletar Atividade?</h5>
        <h6>{deleteActivity.title}</h6>
        <div className={s.wrapperDeleteButtons}>
          <Button
            text={t("no")}
            backgroundColor={"primary"}
            height={42}
            doFunction={() => setDeleteActivity("")}
            isLoading={isLoading}
          />
          <Button
            text={t("yes")}
            backgroundColor={"delete"}
            height={42}
            doFunction={() => DeleteActivityRequest()}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  };

  async function DeleteActivityRequest() {
    const response = await BaseRequest({
      method: "DELETE",
      url: `routines/deleteActivity/${deleteActivity.id}`,
      isAuth: true,
      setIsLoading,
    });
    if (response.status == 200) {
      toast.success(t("toastMessage20"));
      setDeleteActivity("");
      setHasToSavePeople(false);
      GetActivityRoutines();
    }
  }

  return (
    <section className={s.wrapperModal}>
      <DeleteModal />
      <div className={s.timeline}>
        <div className={s.fixedHeader}>
          <div className={s.closeModal}>
            <button type="button" onClick={() => setIsOpen(false)}>
              <img src={closeIcon} alt="Close Modal" />
            </button>
          </div>
          {tipsEnabled && (
          <p className={"tips"}>ℹ️ {t("tip12")}</p>
        )}
          <section className={s.titleRoutine}>
            <p>{person?.peopleName}</p>
            <p>{t(weekDay.dayName)}</p>
            <p>{preset.name}</p>
          </section>
          <section className={s.addActivityButton}>
            <DropdownField
              type="text"
              fieldName="activityPresetParam"
              formik={formikActivityParam}
              value={formikActivityParam.values.activityParam}
              options={activitiesParam}
            />
            <Button
              text={t("addActivity")}
              backgroundColor={"primary"}
              height={42}
              doFunction={() => {
                RegisterRoutineActivity(true);
              }}
            />
          </section>
        </div>
        {items.length > 0 && (
          <>
            <div className={s.scrollContainer}>
            {/* Hours */}
            <div className={s.hours}>
              {Array.from({ length: timeSlots }, (_, i) => {
                const hour = Math.floor(i / 4); // Divide por 4 para obter a hora cheia
                const minutesArray = ["00", "15", "30", "45"];
                const minute = minutesArray[i % 4]; // Pega o resto da divisão para o minuto
                const displayTime = `${hour.toString().padStart(2, '0')}:${minute}`;
                
                return (
                  <div key={i} className={s.hour} style={{ width: gridSize }}>
                    {minute === "00" ? <strong>{displayTime}</strong> : minute}
                  </div>
                );
              })}
            </div>
              {/* Activities */}
              <div
                style={{ height: `${items.length * 50}px` }}
                className={s.events}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    axis="x"
                    bounds="parent"
                    // IMPORTANTE: grid agora é [minPixel, minPixel] para permitir mover de 1 em 1 min
                    grid={[minPixel, minPixel]} 
                    position={{ x: item.start * minPixel, y: 0 }}
                    onStop={(e, data) => handleDragStop(e, data, item.id)}
                    handle=".drag-handle">
                    <div style={{ position: "absolute", top: index * rowHeight, left: 0 }}>
                      <ResizableBox
                        width={item.duration * minPixel}
                        height={rowHeight - 10}
                        minConstraints={[minPixel, rowHeight - 10]} 
                        maxConstraints={[
                          (1440 - item.start) * minPixel, // Agora permite chegar em 1440
                          rowHeight - 10,
                        ]}
                        axis="x"
                        onResizeStop={(e, data) => handleResizeStop(e, data, item.id)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setDeleteActivity(item);
                        }}
                        resizeHandles={["e"]}
                        handle={
                          <span
                            className={s.resizeHandle}
                            onMouseDown={(e) => e.stopPropagation()}
                          />
                        }>
                        <div
                          className={`${s.eventBox} drag-handle`}
                          style={{ background: item.color }}>
                          <p>{item.title}</p>
                          <p className={s.duration}>{item.duration}m</p>
                        </div>
                      </ResizableBox>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
            <div className={s.deleteActivities}>
              <p>{t('deleteActivities')}</p>
            </div>
            <div className={s.arrayButtons}>
              <Button
                text={t("cancel")}
                backgroundColor={"secondary"}
                height={42}
                doFunction={() => {
                  setIsOpen(false);
                }}
              />
              <Button
                text={t("save")}
                backgroundColor={"primary"}
                height={42}
                doFunction={() => {
                  SaveRoutine();
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
