import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const th={"tooltip": {
        "wrapper": {},
        "container": {
            "background": "#000000",
            "color": "#333333",
            "fontSize": 17
        }}};
const MyResponsiveLine = ({ data ,Base/* see data tab */ }) => {
    return <ResponsiveLine
        data={data}
        theme={th}
        margin={{ top: 15, right: 15, bottom: 25, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        areaBaselineValue={Base}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
    />
}

export default MyResponsiveLine;
