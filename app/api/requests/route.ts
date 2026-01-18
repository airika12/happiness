import { NextResponse } from 'next/server';
import { google } from 'googleapis';

type RequestPayload = {
  item: string;
  name: string;
  division: string;
  content: string;
};

function nowJstString() {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

async function appendToGoogleSheet(payload: RequestPayload) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheetName = process.env.GOOGLE_SHEET_NAME!;
  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!;
  if (!spreadsheetId || !sheetName || !saJson) {
    throw new Error('Google Sheets env is missing');
  }

  const creds = JSON.parse(saJson);

  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const values = [[
    nowJstString(),
    payload.item,
    payload.name,
    payload.division,
    payload.content,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:E`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

async function notifyChatwork(payload: RequestPayload) {
  const token = process.env.CHATWORK_API_TOKEN!;
  const roomId = process.env.CHATWORK_ROOM_ID!;
  if (!token || !roomId) {
    throw new Error('Chatwork env is missing');
  }

  const message =
`[info][title]社内申請を受け付けました[/title]
申請日時: ${nowJstString()}
申請項目: ${payload.item}
氏名: ${payload.name}
事業部: ${payload.division}

内容:
${payload.content}
[/info]`;

  const res = await fetch(`https://api.chatwork.com/v2/rooms/${roomId}/messages`, {
    method: 'POST',
    headers: {
      'X-ChatWorkToken': token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ body: message }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Chatwork notify failed: ${res.status} ${text}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<RequestPayload>;

    const item = (body.item ?? '').trim();
    const name = (body.name ?? '').trim();
    const division = (body.division ?? '').trim();
    const content = (body.content ?? '').trim();

    if (!item || !name || !division || !content) {
      return NextResponse.json(
        { ok: false, error: '必須項目が不足しています（申請項目/氏名/事業部/内容）' },
        { status: 400 }
      );
    }

    const payload: RequestPayload = { item, name, division, content };

    await appendToGoogleSheet(payload);
    await notifyChatwork(payload);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'unknown error' },
      { status: 500 }
    );
  }
}
