export default function TitleOverviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">标题详情</h1>
        <p className="text-gray-600">标题ID: {params.id}</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500">标题详情页面开发中...</p>
      </div>
    </div>
  )
}
