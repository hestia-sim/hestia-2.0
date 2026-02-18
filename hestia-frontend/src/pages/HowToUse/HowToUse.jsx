// Components
import Header from "../../basics/Header/Header";
// Images
// Imports
import { useTranslation } from "react-i18next";
//Styles
import s from "./HowToUse.module.scss";
import { Helmet } from "react-helmet";

export default function HowToUse() {
  const { t } = useTranslation();

  return (
    <main className={s.wrapperFinalFile}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>HESTIA | How To Use</title>
      </Helmet>
      <Header />

      <section className={s.hestiaInfoWrapper}>
        <h1>{t("howToUse")}</h1>

        <div className={s.contentFlow}>
          <article className={s.stepSection}>
            <h2>{t("howToUsePurpose")}</h2>
            <p>{t("howToUsePurposeDesc")}</p>
            <div className={s.imagePlaceholder}>
               <img src="/info1.png"/>
            </div>
          </article>

          <article className={s.stepSection}>
            <h2>{t("howToUseHowWorks")}</h2>
            <p>{t("howToUseHowWorksDesc")}</p>
            <div className={s.imagePlaceholder}>
               <img src="/info2.png"/>
            </div>
          </article>
          <article className={s.stepSection}>
            <h2>{t("howToUseParamsPresets")}</h2>
            
            <div className={s.subStep}>
              <h3>{t("howToUseParams")}</h3>
              <p>{t("howToUseParamsDesc")}</p>
              <ul className={s.paramsList}>
                <li><strong>{t("howToUseParamsPeople").split(":")[0]}:</strong> {t("howToUseParamsPeople").split(":")[1]}</li>
                <li><strong>{t("howToUseParamsActivities").split(":")[0]}:</strong> {t("howToUseParamsActivities").split(":")[1]}</li>
                <li><strong>{t("howToUseParamsRooms").split(":")[0]}:</strong> {t("howToUseParamsRooms").split(":")[1]}</li>
                <li><strong>{t("howToUseParamsActuators").split(":")[0]}:</strong> {t("howToUseParamsActuators").split(":")[1]}</li>
                <li><strong>{t("howToUseParamsActivityPreset").split(":")[0]}:</strong> {t("howToUseParamsActivityPreset").split(":")[1]}</li>
              </ul>
            </div>

            <div className={s.imagePlaceholder}>
               <img src="/info3.png"/>
            </div>

            <div className={s.subStep}>
              <h3>{t("howToUsePresets")}</h3>
              <p>{t("howToUsePresetsDesc")}</p>
            </div>
          </article>

          <hr className={s.divider} />

          <article className={s.stepSection}>
            <h2>{t("howToUseStepByStep")}</h2>
            
            <div className={s.visualStep}>
              <div className={s.stepText}>
                <span>1</span>
                <p>{t("howToUseStep1Desc")}</p>
              </div>
              <div className={s.imagePlaceholderSmall}>
                <img src="/info4.png"/>
              </div>
            </div>

            <div className={s.visualStep}>
              <div className={s.stepText}>
                <span>2</span>
                <p>{t("howToUseStep2Desc")}</p>
              </div>
              <div className={s.imagePlaceholderSmall}>
                <img src="/info5.png"/>
              </div>
            </div>

            <div className={s.visualStep}>
              <div className={s.stepText}>
                <span>3</span>
                <p>{t("howToUseStep3Desc")}</p>
              </div>
              <div className={s.imagePlaceholderSmall}>
                <img src="/info6.png"/>
              </div>
            </div>

            {/* Repita o padrão acima para os passos 4, 5, 6 e 7 conforme sua necessidade */}
            {[4, 5, 6, 7].map((step) => (
              <div key={step} className={s.visualStep}>
                <div className={s.stepText}>
                  <span>{step}</span>
                  <p>{t(`howToUseStep${step}Desc`)}</p>
                </div>
                <div className={s.imagePlaceholderSmall}>
                  <img src={`/info${step + 3}.png`}/>
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}