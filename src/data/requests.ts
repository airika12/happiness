export interface RequestType {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  fields: RequestField[];
}

export interface RequestField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'file' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export const requestTypes: RequestType[] = [
  {
    id: '1',
    type: 'expense-support',
    name: '経費精算サポート依頼',
    description: '経費精算に関する質問やサポート依頼',
    icon: 'HelpCircle',
    fields: [
      {
        id: 'subject',
        label: '件名',
        type: 'text',
        required: true,
        placeholder: '例：領収書を紛失した場合の対応について'
      },
      {
        id: 'expense-date',
        label: '経費発生日',
        type: 'date',
        required: true
      },
      {
        id: 'amount',
        label: '金額',
        type: 'number',
        required: true,
        placeholder: '例：5000'
      },
      {
        id: 'description',
        label: '詳細内容',
        type: 'textarea',
        required: true,
        placeholder: '状況を詳しくご記入ください'
      }
    ]
  },
  {
    id: '2',
    type: 'attendance-correction',
    name: '勤怠修正依頼',
    description: '打刻忘れや勤怠記録の修正依頼',
    icon: 'Clock',
    fields: [
      {
        id: 'target-date',
        label: '対象日',
        type: 'date',
        required: true
      },
      {
        id: 'correction-type',
        label: '修正内容',
        type: 'select',
        required: true,
        options: ['出勤打刻忘れ', '退勤打刻忘れ', '打刻時刻修正', 'その他']
      },
      {
        id: 'correct-time',
        label: '正しい時刻',
        type: 'text',
        required: true,
        placeholder: '例：09:00'
      },
      {
        id: 'reason',
        label: '理由',
        type: 'textarea',
        required: true,
        placeholder: '修正が必要な理由をご記入ください'
      }
    ]
  },
  {
    id: '3',
    type: 'equipment-purchase',
    name: '備品購入申請',
    description: 'オフィス用品や機器の購入申請',
    icon: 'ShoppingCart',
    fields: [
      {
        id: 'item-name',
        label: '品名',
        type: 'text',
        required: true,
        placeholder: '例：モニター 27インチ'
      },
      {
        id: 'quantity',
        label: '数量',
        type: 'number',
        required: true,
        placeholder: '例：1'
      },
      {
        id: 'estimated-price',
        label: '見積金額',
        type: 'number',
        required: true,
        placeholder: '例：35000'
      },
      {
        id: 'purpose',
        label: '使用目的',
        type: 'textarea',
        required: true,
        placeholder: '購入理由と使用用途をご記入ください'
      },
      {
        id: 'supplier',
        label: '購入先（任意）',
        type: 'text',
        required: false,
        placeholder: '例：Amazon、ヨドバシカメラ'
      }
    ]
  },
  {
    id: '4',
    type: 'leave-request',
    name: '休暇申請',
    description: '有給休暇・特別休暇の申請',
    icon: 'Palmtree',
    fields: [
      {
        id: 'leave-type',
        label: '休暇種別',
        type: 'select',
        required: true,
        options: ['有給休暇（全日）', '有給休暇（午前半休）', '有給休暇（午後半休）', '特別休暇', '慶弔休暇']
      },
      {
        id: 'start-date',
        label: '開始日',
        type: 'date',
        required: true
      },
      {
        id: 'end-date',
        label: '終了日',
        type: 'date',
        required: true
      },
      {
        id: 'reason',
        label: '理由（任意）',
        type: 'textarea',
        required: false,
        placeholder: '必要に応じて理由をご記入ください'
      }
    ]
  },
  {
    id: '5',
    type: 'it-support',
    name: 'ITサポート依頼',
    description: 'PC・システムのトラブルサポート',
    icon: 'Laptop',
    fields: [
      {
        id: 'issue-type',
        label: '問題の種類',
        type: 'select',
        required: true,
        options: ['PC不調', 'ネットワーク接続', 'システムログイン', 'ソフトウェア', 'その他']
      },
      {
        id: 'urgency',
        label: '緊急度',
        type: 'select',
        required: true,
        options: ['至急（業務停止）', '高（業務に支障）', '中（不便だが業務可能）', '低（時間のある時で可）']
      },
      {
        id: 'description',
        label: '症状・詳細',
        type: 'textarea',
        required: true,
        placeholder: '問題の詳細、エラーメッセージなどをご記入ください'
      },
      {
        id: 'screenshot',
        label: 'スクリーンショット（任意）',
        type: 'file',
        required: false
      }
    ]
  },
  {
    id: '6',
    type: 'meeting-room',
    name: '会議室予約',
    description: '会議室の予約申請',
    icon: 'Users',
    fields: [
      {
        id: 'meeting-date',
        label: '利用日',
        type: 'date',
        required: true
      },
      {
        id: 'start-time',
        label: '開始時刻',
        type: 'text',
        required: true,
        placeholder: '例：14:00'
      },
      {
        id: 'end-time',
        label: '終了時刻',
        type: 'text',
        required: true,
        placeholder: '例：16:00'
      },
      {
        id: 'room-size',
        label: '会議室サイズ',
        type: 'select',
        required: true,
        options: ['小（8名）', '中（20名）', '大（50名）']
      },
      {
        id: 'purpose',
        label: '利用目的',
        type: 'text',
        required: true,
        placeholder: '例：プロジェクト定例会議'
      },
      {
        id: 'attendees',
        label: '参加人数',
        type: 'number',
        required: true,
        placeholder: '例：10'
      }
    ]
  }
];
