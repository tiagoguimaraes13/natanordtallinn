import React from "react";
import { useTranslation } from "react-i18next";
import './PrivacyPolicy.css';


export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="policy-container space-y-4">
      <h1 className="text-2xl font-bold">{t("privacyPolicy.title")}</h1>

      <p>{t("privacyPolicy.intro")}</p>

      <h2 className="text-xl font-semibold">{t("privacyPolicy.dataCollectionTitle")}</h2>
      <p>{t("privacyPolicy.dataCollectionText")}</p>

      <h2 className="text-xl font-semibold">{t("privacyPolicy.dataUseTitle")}</h2>
      <p>{t("privacyPolicy.dataUseText")}</p>

      <h2 className="text-xl font-semibold">{t("privacyPolicy.dataProtectionTitle")}</h2>
      <p>{t("privacyPolicy.dataProtectionText")}</p>

      <h2 className="text-xl font-semibold">{t("privacyPolicy.cookiesTitle")}</h2>
      <p>{t("privacyPolicy.cookiesText")}</p>

      <h2 className="text-xl font-semibold">{t("privacyPolicy.contactTitle")}</h2>
      <p>{t("privacyPolicy.contactText")}</p>
    </div>
  );
};
