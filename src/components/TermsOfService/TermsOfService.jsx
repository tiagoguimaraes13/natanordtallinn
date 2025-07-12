import React from "react";
import { useTranslation } from "react-i18next";

export const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="policy-container space-y-4">
      <h1 className="text-2xl font-bold">{t("termsOfService.title")}</h1>

      <p>{t("termsOfService.intro")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.ordersTitle")}</h2>
      <p>{t("termsOfService.ordersText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.paymentTitle")}</h2>
      <p>{t("termsOfService.paymentText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.deliveryTitle")}</h2>
      <p>{t("termsOfService.deliveryText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.refundsTitle")}</h2>
      <p>{t("termsOfService.refundsText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.userConductTitle")}</h2>
      <p>{t("termsOfService.userConductText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.changesTitle")}</h2>
      <p>{t("termsOfService.changesText")}</p>

      <h2 className="text-xl font-semibold">{t("termsOfService.contactTitle")}</h2>
      <p>{t("termsOfService.contactText")}</p>
    </div>
  );
};
