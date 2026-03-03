import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface Props {
  period: string
}

export function ChartLineStep({ period }: Props) {
  return (
    <Card className="rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-slate-100">
          {period}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(148,163,184,0.08)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#e2e8f0", fontSize: 13, fontWeight: 500 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              itemStyle={{
                color: "#ffffff", // valor en blanco
                fontWeight: 600,
              }}
              content={
                <ChartTooltipContent
                  className="bg-slate-900 border border-slate-700 shadow-xl"
                  labelClassName="text-slate-300 font-medium"
                />
              }
            />
            {/* <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            /> */}

            <Line
              dataKey="desktop"
              type="step"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
