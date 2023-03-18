import {
  AiOutlineDollarCircle,
  AiOutlineFileProtect,
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

import AdministracionLayout from "../components/administracion/AdministracionLayout";
import MainLayout from "../components/logistica/MainLayout";
import PersonalTipoLayout from "../components/personal/PersonalTipoLayout";
import IndexLayout from "../components/planillas/IndexLayout";
import MainLayoutFinanzas from "../components/finanzas/MainLayoutFinanzas";

export const SidebarData = [
  {
    title: "Administración",
    path: "/administracion",
    icon: <AiOutlineSetting />,
    to: <AdministracionLayout />,
  },
  {
    title: "Personal",
    path: "/personal",
    icon: <AiOutlineUsergroupAdd />,
    to: <PersonalTipoLayout />,
  },
  {
    title: "Planillas",
    path: "/planilla",
    icon: <AiOutlineFileProtect />,
    to: <IndexLayout />,
  },
  {
    title: "Logística",
    path: "/logistica",
    icon: <AiOutlineShoppingCart />,
    to: <MainLayout />,
  },
  {
    title: "Finanzas",
    path: "/finanzas",
    icon: <AiOutlineDollarCircle />,
    to: <MainLayoutFinanzas />,
  },
];
