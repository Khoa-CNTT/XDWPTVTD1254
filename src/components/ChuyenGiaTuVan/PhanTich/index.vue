<template>
    <div class="card shadow-lg p-3 mb-5 bg-body rounded">
        <div class="card-header mt-2 p-3 bg-light rounded">
            <div class="row align-items-center">
                <div class="col-lg-9 col-md-12 mb-2 mb-lg-0">
                    <h5 class="mb-0"><b>Phân tích và báo cáo sức khỏe người dùng HEALTH CARE</b></h5>
                </div>
                <div class="col-lg-3 col-md-12 text-end">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportModal"
                        @click="loadReportData">Tạo Báo Cáo</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ phân tích Chiều Cao</h6>
                    <canvas id="chieuCaoChart"></canvas>
                </div>

                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ phân tích Cân Nặng</h6>
                    <canvas id="canNangChart"></canvas>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ phân tích BMI</h6>
                    <canvas id="bmiChart"></canvas>
                </div>
                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ phân tích Huyết Áp Tâm Trương</h6>
                    <canvas id="huyetApChart"></canvas>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ phân tích Nồng độ Oxy</h6>
                    <canvas id="nongDoOxyChart"></canvas>
                </div>
                <div class="col-lg-6">
                    <h6 class="text-center">Biểu đồ Nhóm máu</h6>
                    <canvas id="nhomMauChart" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
        <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reportModalLabel">Báo Cáo Phân Tích Cộng Đồng Người Dùng Health Care
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3 class="text-center"><b>BÁO CÁO DỮ LIỆU SỨC KHỎE HỆ THỐNG HEALTH CARE</b></h3>
                        <h5>Ngày: {{ reportDate }}</h5>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Chỉ số</th>
                                    <th>Giá trị trung bình</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chiều Cao</td>
                                    <td>{{ reportData.averageHeight }}</td>
                                </tr>
                                <tr>
                                    <td>Cân Nặng</td>
                                    <td>{{ reportData.averageWeight }}</td>
                                </tr>
                                <tr>
                                    <td>BMI</td>
                                    <td>{{ reportData.averageBMI }}</td>
                                </tr>
                                <tr>
                                    <td>Nồng Độ Oxy</td>
                                    <td>{{ reportData.averageOxygen }}</td>
                                </tr>
                                <tr>
                                    <td>Huyết Áp</td>
                                    <td>{{ reportData.averageBloodPressure }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 class="mt-3"><b>Phân Bố Nhóm Máu</b></h5>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nhóm Máu</th>
                                    <th>Số Lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bloodGroup in bloodGroupData" :key="bloodGroup.group">
                                    <td>{{ bloodGroup.group }}</td>
                                    <td>{{ bloodGroup.count }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h6 class="text-end">Người Tạo Báo Cáo</h6>
                        <br><br><br><br><br>
                        <h6 class="text-end">{{ ten }}</h6>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="printReport">In Báo Cáo</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            errorMessage: '',
            reportData: [],
            reportDate: '',
            ten: '',
        };
    },
    mounted() {
        this.loadDataBMI();
        this.loadDataChieuCao();
        this.loadDataCanNang();
        this.loadDataNongDoOxy();
        this.loadDataHuyetAp();
        this.loadDataNhomMau();
    },
    methods: {
        loadDataBMI() {
            baseRequest
                .get('admin/phan-tich/bmi')
                .then(response => {
                    if (response.data.status) {
                        this.bmiData = response.data.data; // Lưu dữ liệu BMI thô từ BE
                        this.createBMIChart(); // Gọi hàm vẽ biểu đồ
                    }
                })
                .catch(error => console.error(error));
        },
        createBMIChart() {
            let bmiUnderweight = this.bmiData.filter(item => item.bmi < 18.5).length;
            let bmiNormal = this.bmiData.filter(item => item.bmi >= 18.5 && item.bmi <= 24.9).length;
            let bmiOverweight = this.bmiData.filter(item => item.bmi >= 25 && item.bmi <= 29.9).length;
            let bmiObesity = this.bmiData.filter(item => item.bmi >= 30).length;
            const ctx = document.getElementById('bmiChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Ốm', 'Bình Thường', 'Thừa Cân', 'Béo Phì'],
                    datasets: [{
                        data: [bmiUnderweight, bmiNormal, bmiOverweight, bmiObesity],
                        backgroundColor: ['#FF9999', '#99FF99', '#FFCC99', '#FF6666']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadDataChieuCao() {
            baseRequest
                .get('admin/phan-tich/chieu-cao')
                .then(response => {
                    if (response.data.status) {
                        this.chieuCaoData = response.data.data;
                        this.createChieuCaoChart();
                    }
                })
                .catch(error => console.error(error));
        },
        createChieuCaoChart() {
            let heightShort = this.chieuCaoData.filter(item => item.chieu_cao < 1.5).length;
            let heightNormal = this.chieuCaoData.filter(item => item.chieu_cao >= 1.5 && item.chieu_cao <= 1.7).length;
            let heightTall = this.chieuCaoData.filter(item => item.chieu_cao > 1.7).length;
            const ctx = document.getElementById('chieuCaoChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Dưới 1.5m', 'Từ 1.5m-1.7m', 'Trên 1.7m'],
                    datasets: [{
                        data: [heightShort, heightNormal, heightTall],
                        backgroundColor: ['#FF9999', '#99FF99', '#9999FF']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadDataCanNang() {
            baseRequest
                .get('admin/phan-tich/can-nang')
                .then(response => {
                    if (response.data.status) {
                        this.canNangData = response.data.data;
                        this.createCanNangChart();
                    }
                })
                .catch(error => console.error(error));
        },
        createCanNangChart() {
            let canNang40 = this.canNangData.filter(item => item.can_nang < 40).length;
            let canNang60 = this.canNangData.filter(item => item.can_nang >= 40 && item.can_nang <= 60).length;
            let canNang80 = this.canNangData.filter(item => item.can_nang >= 60 && item.can_nang <= 80).length;
            let canNang100 = this.canNangData.filter(item => item.can_nang > 80).length;
            const ctx = document.getElementById('canNangChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Dưới 40kg', 'Từ 40-60kg', 'Từ 60-80kg', 'Trên 80'],
                    datasets: [{
                        data: [canNang40, canNang60, canNang80, canNang100],
                        backgroundColor: ['#FF9999', '#99FF99', '#FFCC99', '#FF6666']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadDataNongDoOxy() {
            baseRequest
                .get('admin/phan-tich/nong-do-oxy')
                .then(response => {
                    if (response.data.status) {
                        this.nongdoOxyData = response.data.data;
                        this.createNongDoOxyChart();
                    }
                })
                .catch(error => console.error(error));
        },
        createNongDoOxyChart() {
            let suyHoHap = this.nongdoOxyData.filter(item => item.nong_do_oxy < 90).length;
            let thieuOxy = this.nongdoOxyData.filter(item => item.nong_do_oxy > 90 && item.nong_do_oxy < 95).length;
            let binhThuong = this.nongdoOxyData.filter(item => item.nong_do_oxy >= 95).length;

            const ctx = document.getElementById('nongDoOxyChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Bình thường', 'Thiếu oxy trong máu', 'Suy hô hấp'],
                    datasets: [{
                        data: [binhThuong, thieuOxy, suyHoHap],
                        backgroundColor: ['#FF9999', '#99FF99', '#FFCC99']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadDataHuyetAp() {
            baseRequest
                .get('admin/phan-tich/huyet-ap')
                .then(response => {
                    if (response.data.status) {
                        this.huyetApData = response.data.data;
                        this.createHuyetApChart();
                    }
                })
                .catch(error => console.error(error));
        },
        createHuyetApChart() {
            let toiUu = this.huyetApData.filter(item => item.huyet_ap_tam_truong < 80).length;
            let binhThuong = this.huyetApData.filter(item => item.huyet_ap_tam_truong >= 890 && item.huyet_ap_tam_truong < 85).length;
            let cao = this.huyetApData.filter(item => item.huyet_ap_tam_truong >= 85 && item.huyet_ap_tam_truong < 90).length;
            let do1 = this.huyetApData.filter(item => item.huyet_ap_tam_truong >= 90 && item.huyet_ap_tam_truong < 100).length;
            let do2 = this.huyetApData.filter(item => item.huyet_ap_tam_truong >= 100 && item.huyet_ap_tam_truong < 110).length;
            let do3 = this.huyetApData.filter(item => item.huyet_ap_tam_truong >= 110).length;

            const ctx = document.getElementById('huyetApChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Tối Ưu', 'Bình Thường', 'Cao', 'Tăng Độ 1', 'Tăng Độ 2', 'Tăng Độ 3'],
                    datasets: [{
                        data: [toiUu, binhThuong, cao, do1, do2, do3],
                        backgroundColor: ['#FF9999', '#99FF99', '#FFCC99', '#FF6666', '#66CCFF', '#9966FF']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadDataNhomMau() {
            baseRequest.get('admin/phan-tich/nhom-mau')
                .then(response => {
                    if (response.data.status) {
                        this.nhomMauData = response.data.data;
                        this.createNhomMauChart();
                    }
                })
                .catch(error => console.error(error));
        },
        createNhomMauChart() {
            // Đếm số lượng các nhóm máu
            const nhomMauA = this.nhomMauData.filter(item => item.nhom_mau === 'A').length;
            const nhomMauB = this.nhomMauData.filter(item => item.nhom_mau === 'B').length;
            const nhomMauAB = this.nhomMauData.filter(item => item.nhom_mau === 'AB').length;
            const nhomMauO = this.nhomMauData.filter(item => item.nhom_mau === 'O').length;

            // Vẽ biểu đồ
            const ctx = document.getElementById('nhomMauChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Nhóm máu A', 'Nhóm máu B', 'Nhóm máu AB', 'Nhóm máu O'],
                    datasets: [{
                        data: [nhomMauA, nhomMauB, nhomMauAB, nhomMauO],
                        backgroundColor: [
                            '#FF9999', // Nhóm máu A
                            '#99FF99', // Nhóm máu B
                            '#FFCC99', // Nhóm máu AB
                            '#66CCFF'  // Nhóm máu O
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    let index = tooltipItem.dataIndex;
                                    let label = tooltipItem.label;
                                    let count = tooltipItem.raw;
                                    return `${label}: ${count} người dùng`;
                                }
                            }
                        }
                    }
                }
            });
        },
        loadReportData() {
            this.ten = localStorage.getItem('ten');
            const today = new Date().toLocaleDateString();
            this.reportDate = this.formatDateVN(today);
            baseRequest
                .get('admin/phan-tich/bao-cao')
                .then(response => {
                    if (response.data.status) {
                        const data = response.data.data;

                        // Gán dữ liệu từ API vào các biến trong Vue.js
                        this.reportData = {
                            averageHeight: data.average_height.toFixed(2) + ' m',
                            averageWeight: data.average_weight.toFixed(2) + ' kg',
                            averageBMI: data.average_bmi.toFixed(2),
                            averageOxygen: data.average_oxygen.toFixed(2) + ' %',
                            averageBloodPressure: data.average_blood_pressure.toFixed(2) + ' mmHg',
                            bloodGroupCounts: data.blood_group_counts
                        };

                        // Cập nhật danh sách nhóm máu để hiển thị
                        this.bloodGroupData = Object.entries(data.blood_group_counts).map(([group, count]) => ({
                            group,
                            count
                        }));
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu báo cáo:', error);
                });
        },
        formatDateVN(dateString) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        printReport() {
            const printContents = document.querySelector('#reportModal .modal-body').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        },

        // printReport() {
        //     const printContents = document.querySelector('#reportModal .modal-body').innerHTML; // Lấy nội dung modal-body
        //     const originalContents = document.body.innerHTML;

        //     // Tạo trang tạm để in
        //     const printWindow = window.open('', '', 'height=600,width=800');
        //     printWindow.document.write('<html><head><title>Báo Cáo</title>');
        //     printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">'); // Thêm CSS nếu cần
        //     printWindow.document.write('</head><body>');
        //     printWindow.document.write('<div style="padding: 20px;">'); // Tùy chỉnh khoảng cách
        //     printWindow.document.write(printContents);
        //     printWindow.document.write('</div>');
        //     printWindow.document.write('</body></html>');
        //     printWindow.document.close(); // Đóng stream ghi
        //     printWindow.print(); // In nội dung trong cửa sổ tạm
        // }

    },
};
</script>
<style scoped>
.card-body {
    padding: 20px;
}

canvas {
    max-width: 100%;
    height: auto;
}

table {
    width: 100%;
    margin-top: 20px;
}
</style>
