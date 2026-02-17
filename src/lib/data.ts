import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/site-data.json");

export interface Church {
  name: string;
  shortName: string;
  tagline: string;
  pastor: string;
  address: string;
  mailingAddress: string;
  phone: string;
  email: string;
  facebook: string;
  youtube: string;
  officeHours: string;
  givingInfo: string;
  athMovil: string;
  livestreamUrl: string;
}

export interface ScheduleItem {
  time: string;
  name: string;
  description: string;
}

export interface ServiceSchedule {
  sunday: ScheduleItem[];
  monday: ScheduleItem[];
  tuesday: ScheduleItem[];
  wednesday: ScheduleItem[];
  thursday: ScheduleItem[];
  saturday: ScheduleItem[];
}

export interface MinistryActivity {
  name: string;
  description: string;
}

export interface Ministry {
  id: string;
  name: string;
  icon: string;
  description: string;
  content: string;
  leader: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl: string;
  active: boolean;
  activities: MinistryActivity[];
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  recurring: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

export interface TimelineEntry {
  year: string;
  event: string;
}

export interface History {
  founded: string;
  timeline: TimelineEntry[];
}

export interface Sermon {
  id: string;
  title: string;
  pastor: string;
  date: string;
  scripture: string;
  summary: string;
  description: string;
  transcript: string;
  videoUrl: string;
  audioUrl: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
  approved: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface Bulletin {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  published: boolean;
}

export interface SiteData {
  church: Church;
  serviceSchedule: ServiceSchedule;
  ministries: Ministry[];
  events: ChurchEvent[];
  announcements: Announcement[];
  history: History;
  sermons: Sermon[];
  gallery: GalleryPhoto[];
  prayerRequests: PrayerRequest[];
  newsletterSubscribers: NewsletterSubscriber[];
  bulletins: Bulletin[];
}

export function getSiteData(): SiteData {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function writeSiteData(data: SiteData): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
