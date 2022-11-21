import { Option } from "../option";
import { Product } from "../product";
import { Schedule } from "../schedule";
import { Service } from "../service";
import { Slot } from "../slot";

export type RootStackParams = {
  App: any;
  AuthStack: any;
  AllBookmarks: {
    postId: string;
    userId: string;
  };
  AddLocation: any;
  AddServices: any;
  AddProducts: any;
  AddJobs: any;
  AddSchedule: any;
  AddPost: any;
  Bookmarks: {
    user: any;
  };
  Comments: {
    postId: string;
    description: string;
    avatar: any;
    username: string;
  };
  CalendarBig: {
    product: Product;
    service: Service;
  };
  Camera: {
    name: string;
    avatar: any;
  };
  CameraPreview: {
    photo: string;
    avatar: any;
  };
  Discounts: any;
  EditProfile: {
    user: any;
  };
  EditBio: any;
  EditName: any;
  EditWebsite: any;
  EditUsername: any;
  EditProfession: any;
  EditAvatar: {
    photo: string;
  };
  EditProduct: {
    product: any;
  };
  SearchServices: any;
  FindFriends: any;
  FiltersDate: any;
  FiltersService: any;
  Feed: any;
  Hashtag: {
    name: string;
    postsCount: number;
  };
  Login: any;
  Locations: {
    service: Service;
    option: Option;
  };
  LocationItem: { locationId: string };
  Likes: { postId: string };
  MyBusiness: any;
  MyDashboard: any;
  MyCalendar: any;
  MyLocation: any;
  MyProducts: any;
  MyJobs: any;
  Messages: any;
  MessageItem: {
    user: {
      _id: string;
      name: string;
      username: string;
      avatar: string;
      checkmark: boolean;
    };
  };
  MessageSettings: {
    _id: string;
    avatar: any;
    name: string;
    username: string;
    checkmark: Boolean;
    conversationId: string;
  };
  MessageNew: any;
  Notifications: any;
  Map: {
    profession: {
      _id: string;
      name: string;
    };
  };
  Post: { userId: string };
  Profile: any;
  ProfileGeneral: {
    userId: string | null;
    username: string;
    avatar: any | null;
    name: string | null;
    checkmark: boolean | null;
    service: string | null;
    option: string | null;
  };
  ProfileStats: {
    screen: string;
    userId: string;
    username: string;
    initialRoute: string;
    role: string;
    ratingsQuantity: number;
    followersCount: number;
    followingsCount: number;
  };
  PhotoLibrary: any;
  PhotoAlbums: any;
  Register: any;
  RegisterBusiness: any;
  Settings: any;
  SearchAll: { search: string };
  Schedules: any;
  ScheduleConfirm: {
    service: Service;
    product: Product;
    slot: Slot;
  };
  ScheduleDetails: { schedule: Schedule };
  ScheduleCancel: { scheduleId: string };
  SearchPosts: { search: string };
  Service: { service: Service };
  Test: any;
  Username: { isTokenResult: string; role: string };
  SharedList: any;
  SharedDetail: any;
  Shared: any;
};