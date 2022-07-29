import {
  DashboardOutlined,
  UserOutlined,
  DollarCircleOutlined,
  SwapOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { FaBeer } from "react-icons/fa";
const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const usersNavTree = [
  {
    key: "users",
    path: `${APP_PREFIX_PATH}/users`,
    title: "Users",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const DoctorsNavTree = [
  {
    key: "doctors",
    path: `${APP_PREFIX_PATH}/doctors`,
    title: "Doctors",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const DoctorCategoryNavTree = [
  {
    key: "doctor-category",
    path: `${APP_PREFIX_PATH}/doctor-category`,
    title: "Doctor Category",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const WithdrawNavTree = [
  {
    key: "withdraw",
    path: `${APP_PREFIX_PATH}/withdra-request`,
    title: "Withdraw Request",
    icon: DollarCircleOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const TransactionNavTree = [
  {
    key: "transaction",
    path: `${APP_PREFIX_PATH}/transaction`,
    title: "Transaction",
    icon: SwapOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const SettingsNavTree = [
  {
    key: "settings",
    path: `${APP_PREFIX_PATH}/settings`,
    title: "Settings",
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
//NavigationConst

const navigationConfig = [
  ...dashBoardNavTree,
  ...usersNavTree,
  ...DoctorsNavTree,
  ...DoctorCategoryNavTree,

  ...WithdrawNavTree,
  ...TransactionNavTree,
  ...SettingsNavTree,
  //NavigationConfig
];

export default navigationConfig;
