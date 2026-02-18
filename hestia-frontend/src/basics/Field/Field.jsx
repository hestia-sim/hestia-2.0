import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import s from './Field.module.scss'

function getRandomColor() {
  // Gera uma cor hexadecimal aleatória
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

export default function Field({
  type = "text",
  fieldName,
  readOnly = false,
  formik,
  value = "",
  isLogged = false,
  hasStep = false,
  isSearch = false,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (type === "color" && formik && !formik.values[fieldName]) {
      const randomColor = getRandomColor();
      formik.setFieldValue(fieldName, randomColor);
    }
  }, [type, fieldName, formik]);

  if(isSearch){
    return(
      <div className={s.inputWrapper}>
      <input
        type={type}
        name={fieldName}
        onChange={(e) => {formik.handleChange(e);formik.handleSubmit()}}
        onBlur={formik.handleBlur}
        value={formik?.values[fieldName] || ""}
        readOnly={readOnly}
        placeholder={t(`${fieldName}Placeholder`)}
        className={
          formik.errors[fieldName] && formik.touched[fieldName]
            ? s.fieldError
            : s.field
        }
        step={hasStep ? 0.01 : undefined}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className={s.textError}>{formik.errors[fieldName]}</p>
      )}
    </div>
    )
  }

  if(!formik && readOnly){
    return(
      <div className={s.inputWrapper}>
        <label
          className={isLogged ? `${s.label} ${s.internColors}` : `${s.label} ${s.notInternColors}`}
        >
          {t(fieldName)}
        </label>
        <input
          type={type}
          name={fieldName}
          disabled={true}
          value={value}
          readOnly={readOnly}
          className={s.field}
        />
      </div>
    )
  }

  return (
    <div className={s.inputWrapper}>
      <label
        className={isLogged ? `${s.label} ${s.internColors}` : `${s.label} ${s.notInternColors}`}
      >
        {t(fieldName)}
      </label>
      <input
        type={type}
        name={fieldName}
        onChange={(e) => formik.handleChange(e)}
        onBlur={formik.handleBlur}
        value={formik?.values[fieldName] || ""}
        readOnly={readOnly}
        placeholder={t(`${fieldName}Placeholder`)}
        className={
          formik.errors[fieldName] && formik.touched[fieldName]
            ? s.fieldError
            : s.field
        }
        step={hasStep ? 0.01 : undefined}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className={s.textError}>{formik.errors[fieldName]}</p>
      )}
    </div>
  );
}
