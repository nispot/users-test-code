import { useTranslation } from "react-i18next";
import "./App.css";
import { LanguageSelector } from "./components/LanguageSelector";
import "./i18n";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <LanguageSelector />
        <h1>{t("home_page")}</h1>
      </div>
    </>
  );
}

export default App;
