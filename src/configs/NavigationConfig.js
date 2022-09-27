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
    title: "사용자",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const DoctorsNavTree = [
  {
    key: "doctors",
    path: `${APP_PREFIX_PATH}/doctors`,
    title: "상담사",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const DoctorCategoryNavTree = [
  {
    key: "doctor-category",
    path: `${APP_PREFIX_PATH}/doctor-category`,
    title: "상담 카테고리",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const WithdrawNavTree = [
  {
    key: "withdraw",
    path: `${APP_PREFIX_PATH}/withdra-request`,
    title: "인출 요청",
    icon: DollarCircleOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const TransactionNavTree = [
  {
    key: "transaction",
    path: `${APP_PREFIX_PATH}/transaction`,
    title: "거래",
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
