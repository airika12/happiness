import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('Request received:', {
      type: body.type,
      name: body.name,
      submittedAt: body.submittedAt,
      data: body.data,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: '申請を受け付けました',
        id: `REQ-${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        success: false,
        message: '申請の処理中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
