export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-bold mb-4">👋 Welcome to PC Security Guardian</h2>
        <p className="text-gray-700 mb-4">
          공용 PC의 보안 상태를 쉽고 빠르게 체크하세요.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">🔍 보안 체크</h3>
            <p className="text-sm text-gray-600">
              Windows Defender, 공유 폴더, 네트워크 연결 등을 검사합니다.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">🤖 AI 분석</h3>
            <p className="text-sm text-gray-600">
              명령어 실행 결과를 AI가 분석하고 위험도를 평가합니다.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">🛡️ 권장사항</h3>
            <p className="text-sm text-gray-600">
              발견된 문제에 대한 해결 방법을 제공합니다.
            </p>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          보안 체크 시작하기 →
        </button>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-sm">
          <strong>⚠️ 주의:</strong> 이 도구는 기본적인 보안 상태를 확인하는 용도로, 전문적인 보안 솔루션을 대체하지 않습니다.
        </p>
      </div>
    </div>
  )
}
