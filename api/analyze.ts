import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { commandType, output, sessionId } = await request.json()

    if (!commandType || !output) {
      return NextResponse.json(
        { error: 'commandType and output are required' },
        { status: 400 }
      )
    }

    // OpenAI를 사용하여 명령어 결과 분석
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `당신은 Windows 보안 전문가입니다. 사용자가 실행한 명령어 결과를 분석하고 위험도를 평가하세요.

응답 형식 (JSON):
{
  "riskScore": 0-100,
  "severity": "safe|low|medium|high|critical",
  "threats": [{"type": "...", "description": "...", "recommendation": "..."}],
  "summary": "한 줄 요약"
}`,
        },
        {
          role: 'user',
          content: `명령어 타입: ${commandType}\n\n결과:\n${output}`,
        },
      ],
      response_format: { type: 'json_object' },
    })

    const analysis = JSON.parse(completion.choices[0].message.content || '{}')

    // TODO: Supabase에 결과 저장
    // await saveToDatabase(sessionId, commandType, output, analysis)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error: any) {
    console.error('분석 오류:', error)
    return NextResponse.json(
      { error: 'Analysis failed', message: error.message },
      { status: 500 }
    )
  }
}
