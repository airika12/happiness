export interface SystemLink {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

export const systemLinks: SystemLink[] = [
  {
    id: '1',
    name: 'Attendance',
    nameJa: '勤怠管理',
    description: '出退勤の打刻、残業・休暇申請',
    url: 'https://attendance.example.com',
    icon: 'Clock',
    category: 'hr'
  },
  {
    id: '2',
    name: 'Expense',
    nameJa: '経費精算',
    description: '経費申請と精算処理',
    url: 'https://expense.example.com',
    icon: 'Receipt',
    category: 'finance'
  },
  {
    id: '3',
    name: 'Slack',
    nameJa: 'Slack',
    description: '社内チャット・コミュニケーション',
    url: 'https://yourcompany.slack.com',
    icon: 'MessageSquare',
    category: 'communication'
  },
  {
    id: '4',
    name: 'Google Drive',
    nameJa: 'Google Drive',
    description: 'ファイル共有とドキュメント管理',
    url: 'https://drive.google.com',
    icon: 'HardDrive',
    category: 'storage'
  },
  {
    id: '5',
    name: 'Gmail',
    nameJa: 'Gmail',
    description: '社内メールシステム',
    url: 'https://mail.google.com',
    icon: 'Mail',
    category: 'communication'
  },
  {
    id: '6',
    name: 'Google Calendar',
    nameJa: 'Googleカレンダー',
    description: 'スケジュール管理',
    url: 'https://calendar.google.com',
    icon: 'Calendar',
    category: 'productivity'
  },
  {
    id: '7',
    name: 'Salesforce',
    nameJa: 'Salesforce',
    description: '顧客管理・営業支援システム',
    url: 'https://salesforce.example.com',
    icon: 'TrendingUp',
    category: 'business'
  },
  {
    id: '8',
    name: 'Zoom',
    nameJa: 'Zoom',
    description: 'Web会議システム',
    url: 'https://zoom.us',
    icon: 'Video',
    category: 'communication'
  },
  {
    id: '9',
    name: 'HR System',
    nameJa: '人事システム',
    description: '人事情報の確認・申請',
    url: 'https://hr.example.com',
    icon: 'Users',
    category: 'hr'
  },
  {
    id: '10',
    name: 'Learning Portal',
    nameJa: '研修ポータル',
    description: 'eラーニング・研修管理',
    url: 'https://learning.example.com',
    icon: 'GraduationCap',
    category: 'learning'
  },
  {
    id: '11',
    name: 'IT Helpdesk',
    nameJa: 'ITヘルプデスク',
    description: 'システム・PC関連の問い合わせ',
    url: 'https://helpdesk.example.com',
    icon: 'Headphones',
    category: 'support'
  },
  {
    id: '12',
    name: 'Facilities',
    nameJa: '施設予約',
    description: '会議室・備品の予約',
    url: 'https://facilities.example.com',
    icon: 'Building2',
    category: 'facilities'
  }
];
