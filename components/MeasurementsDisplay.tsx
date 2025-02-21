import { Card, CardContent } from "@/components/ui/card"

interface MeasurementsDisplayProps {
  measurements: Record<string, number>
}

export default function MeasurementsDisplay({ measurements }: MeasurementsDisplayProps) {
  return (
    <Card className="glass shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(measurements).map(([key, value]) => (
            <div key={key} className="glass p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">{key}</h3>
              <p className="text-2xl font-bold text-white">{value.toFixed(2)} cm</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

