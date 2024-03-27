function initEchartsCvtSetup(containerId, customOptions) {
    var chartDom = document.getElementById(containerId);
    var chart = echarts.init(chartDom);

    var options = Object.assign({}, customOptions);
    chart.setOption(options, true);

    setupChartResizeObserver(chart, chartDom);

    return chart;
}
function setupChartResizeObserver(chart, chartDom) {
    var lastWidth = chartDom.clientWidth;
    var lastHeight = chartDom.clientHeight;

    var resizeObserver = new ResizeObserver(function () {
        var newWidth = chartDom.clientWidth;
        var newHeight = chartDom.clientHeight;

        if (lastWidth !== newWidth || lastHeight !== newHeight) {
            lastWidth = newWidth;
            lastHeight = newHeight;
            if (chart && !chart.isDisposed()) {
                chart.resize();
            }
        }
    });

    resizeObserver.observe(chartDom);
}