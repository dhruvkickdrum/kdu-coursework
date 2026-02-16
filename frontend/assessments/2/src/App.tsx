import { Navigate, Route, Routes } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import StatusPage from "./pages/StatusPage/StatusPage"
import styles from './App.module.scss';
function App() {

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/status/:id" element={<StatusPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App
