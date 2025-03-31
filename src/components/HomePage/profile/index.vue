<template>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#chisosuckhoe" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-address-book font-18 me-1"></i>
                                </div>
                                <div class="tab-title">Hồ Sơ Sức Khỏe</div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#capnhatthongtin" role="tab"
                            aria-selected="false" tabindex="-1">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-user font-18 me-1"></i>
                                </div>
                                <div class="tab-title">Cập Nhật Thông Tin</div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#doimatkhau" role="tab" aria-selected="false"
                            tabindex="-1">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-lock font-18 me-1"></i>
                                </div>
                                <div class="tab-title">Đổi mật khẩu</div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3">
                    <div class="tab-pane fade show active" id="chisosuckhoe" role="tabpanel">
                        <div class="row">
                            <div class="card">
                                <div class="card-header">
                                    <h1 class="text-center">Hồ Sơ Sức Khỏe Của {{ profile.ho_va_ten }} </h1>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h5>Chiều Cao</h5>
                                            <input v-model="ho_so.chieu_cao" class="form-control mb-3" type="number"
                                                step="0.01" min="0" placeholder="Đơn vị: mét (m)"
                                                aria-label="default input example">
                                        </div>
                                        <div class="col-lg-6">
                                            <h5>Cân Nặng</h5>
                                            <input v-model="ho_so.can_nang" class="form-control mb-3" type="number"
                                                step="0.1" min="0" placeholder="Đơn vị: kilogram (kg)"
                                                aria-label="default input example">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h5>BMI</h5>
                                            <input v-model="ho_so.bmi" class="form-control mb-3" type="text"
                                                placeholder="Nhập đủ chiều cao & cân nặng để tính"
                                                aria-label="Disabled input example" disabled>
                                        </div>

                                        <div class="col-lg-6">
                                            <h5>Tình Trạng Sức Khỏe</h5>
                                            <input v-model="ho_so.tinh_trang_suc_khoe" class="form-control mb-3"
                                                type="text" placeholder="Được Phân Loại Theo WHO"
                                                aria-label="Disabled input example" disabled>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h5>Nồng Độ Oxy</h5>
                                            <input v-model="ho_so.nong_do_oxy" v-on:change="loadOxyTrongMau"
                                                class="form-control mb-3" type="number" min="0" max="100" step="0.1"
                                                placeholder="Đơn vị: phần trăm (%)" aria-label="default input example">
                                        </div>
                                        <div class="col-lg-6">
                                            <h5>Tình Trạng</h5>
                                            <input v-model="ho_so.tinh_trang_oxy" class="form-control mb-3" type="text"
                                                placeholder="Theo WHO" aria-label="Disabled input example" disabled="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h5>Huyết Áp (đo tại tâm trương)</h5>
                                            <input v-model="ho_so.huyet_ap_tam_truong"
                                                v-on:change="loadTinhTrangHuyetAp" class="form-control mb-3"
                                                type="number" placeholder="Đơn vị: mi-li-mét thủy ngân (mmHg)"
                                                aria-label="default input example">
                                        </div>
                                        <div class="col-lg-6">
                                            <h5>Tình Trạng Huyết Áp</h5>
                                            <input v-model="ho_so.tinh_trang_huyet_ap" class="form-control mb-3"
                                                type="text" placeholder="Huyết Áp Tâm Trương"
                                                aria-label="Disabled input example" disabled="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h5>Nhóm Máu</h5>
                                            <select v-model="ho_so.nhom_mau" class="form-control mb-3"
                                                aria-label="Chọn nhóm máu">
                                                <option value="" disabled>Chọn nhóm máu</option>
                                                <option value="A">Nhóm máu A</option>
                                                <option value="B">Nhóm máu B</option>
                                                <option value="AB">Nhóm máu AB</option>
                                                <option value="O">Nhóm máu O</option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6">
                                            <h5>Mục Tiêu Sức Khỏe</h5>
                                            <input v-model="ho_so.muc_tieu" class="form-control mb-3" type="text"
                                                placeholder="Viết mục tiêu bạn muốn đạt được...">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5"></div>
                                        <div class="col-lg-2">
                                            <input type="button" class="btn btn-primary px-4" value="Lưu Hồ Sơ"
                                                v-on:click="luuHoSo">
                                        </div>
                                        <div class="col-lg-2">
                                            <input v-on:click="loadDataHoSo()" type="button"
                                                class="btn btn-warning px-4" value="Xem Hồ Sơ Sức Khỏe Cũ"
                                                data-bs-toggle="modal" data-bs-target="#hoSoCu">
                                        </div>
                                        <div class="col-lg-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="capnhatthongtin" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex flex-column align-items-center text-center">
                                            <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                                                alt="" class="rounded-circle p-1 bg-primary" width="110">
                                            <div class="mt-3">
                                                <h4>{{ profile.ho_va_ten }}</h4>
                                                <p class="text-secondary mb-1">{{ profile.email }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Họ và tên</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input v-model="profile.ho_va_ten" type="text" class="form-control"
                                                    placeholder="Enter Name">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input v-model="profile.email" type="mail" class="form-control"
                                                    placeholder="Enter Email">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Ngày Sinh</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input v-model="profile.ngay_sinh" type="date" class="form-control"
                                                    placeholder="Enter Email">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Giới Tính</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <select v-model="profile.gioi_tinh" class="form-control">
                                                    <option value="0">Nam</option>
                                                    <option value="1">Nữ</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Số điện thoại</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input v-model="profile.so_dien_thoai" type="text" class="form-control"
                                                    placeholder="Phone">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="button" class="btn btn-primary px-4" value="Save"
                                                    v-on:click="updateProfile()">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="doimatkhau" role="tabpanel">
                        <div class="col">
                            <h4>Thay đổi mật khẩu</h4>
                        </div>
                        <div class="col">Quản lý mật khẩu để bảo mật tài khoản</div>
                        <hr>
                        <div class="row mb-2">
                            <div class="col-2">
                                <label for="">Mật khẩu cũ</label>
                            </div>
                            <div class="col-3">
                                <input v-model="update_password.old_password" type="password"
                                    placeholder="Nhập mật khẩu cũ" class="form-control">
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-2">
                                <label for="">Mật khẩu mới</label>
                            </div>
                            <div class="col-3">
                                <input v-model="update_password.password" type="password"
                                    placeholder="Nhập mật khẩu mới" class="form-control">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-2">
                                <label for="">Nhập lại Mật khẩu mới </label>
                            </div>
                            <div class="col-3">
                                <input v-model="update_password.re_password" type="password"
                                    placeholder="Nhập lại mật khẩu mới" class="form-control">
                            </div>
                        </div>
                        <button class="btn btn-primary" v-on:click="updateMatKhau()">Lưu</button>
                    </div>
                    <div class="modal fade" id="hoSoCu" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Lịch Sử Lưu Hồ Sơ</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-light table-bordered">
                                            <thead>
                                                <tr>
                                                    <th class="text-center align-middle text-nowrap">
                                                        #
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Ngày
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Chiều Cao
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Cân Nặng
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        BMI
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Tình Trạng Sức Khỏe
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Nồng Độ Oxy
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Huyết Áp
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Nhóm Máu
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Mục Tiêu
                                                    </th>
                                                    <th class="text-center align-middle text-nowrap">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="(v, k) in list_ho_so">
                                                    <tr>
                                                        <th class="align-middle text-nowrap text-center">{{ k + 1 }}
                                                        </th>
                                                        <td class="align-middle text-nowrap">{{
                                                            formatDateVN(v.created_at) }}</td>
                                                        <td class="align-middle text-nowrap text-center">{{
                                                            v.chieu_cao }}</td>
                                                        <td class="align-middle text-nowrap">{{ v.can_nang }}</td>
                                                        <td class="align-middle text-nowrap">{{ v.bmi }}</td>
                                                        <td class="align-middle text-nowrap">{{ v.tinh_trang_suc_khoe }}
                                                        </td>

                                                        <td class="align-middle text-nowrap">{{ v.nong_do_oxy }}</td>
                                                        <td class="align-middle text-nowrap">{{ v.huyet_ap_tam_truong }}
                                                        </td>
                                                        <td class="align-middle text-nowrap">{{ v.nhom_mau }}</td>
                                                        <td class="align-middle text-nowrap">{{ v.muc_tieu }}</td>
                                                        <td class="align-middle text-nowrap text-center">
                                                            <button v-on:click="Object.assign(delete_ho_so, v)"
                                                                class="btn btn-danger" data-bs-toggle="modal"
                                                                data-bs-target="#deleteModal">Xóa</button>
                                                        </td>
                                                    </tr>
                                                </template>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Xóa Nhân
                                        Viên
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div
                                        class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                        <div class="d-flex align-items-center">
                                            <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                            </div>
                                            <div class="ms-3">
                                                <h6 class="mb-0 text-dark">Cảnh Báo Xóa Vĩnh Viễn</h6>
                                                <div class="text-dark">
                                                    Bạn có chắc chắn muốn xóa kết quả ngày <b>{{
                                                        formatDateVN(delete_ho_so.created_at) }}</b> này không?
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                    <button v-on:click="accpectDel()" data-bs-dismiss="modal" type="button"
                                        class="btn btn-danger">Xác
                                        Nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from "../../../core/baseRequest";
const toaster = createToaster({ position: "top-right" });
baseRequest
export default {
    data() {
        return {
            ho_so: {
                chieu_cao: null,
                can_nang: null,
                bmi: null,
                tinh_trang_suc_khoe: '',
                nong_do_oxy: null,
                tinh_trang_oxy: '',
                huyet_ap_tam_truong: null,
                tinh_trang_huyet_ap: '',
                nhom_mau: '',
                muc_tieu: '',
            },
            rating: 0,
            feedback: '',
            profile: {},
            update_password: {},
            tuoi: null,
            oxy_tinh_trang: '',
            list_ho_so: [],
            delete_ho_so: {},
        };
    },
    mounted() {
        this.getProfile();
        this.loadLatestHealthRecord();
    },
    watch: {
        'ho_so.chieu_cao'(newVal, oldVal) {
            this.calculateBMI();
        },
        'ho_so.can_nang'(newVal, oldVal) {
            this.calculateBMI();
        }
    },
    methods: {
        accpectDel() {
            baseRequest
                .delete('khach-hang/ho-so/delete/' + this.delete_ho_so.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataHoSo();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        loadLatestHealthRecord() {
            baseRequest
                .get('khach-hang/ho-so/latest') // Đường dẫn API
                .then((res) => {
                    if (res.data.data) {
                        this.ho_so = res.data.data; // Gán kết quả gần nhất vào hồ sơ sức khỏe
                    } else {
                        toaster.info('Không có dữ liệu sức khỏe gần nhất!');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toaster.error('Có lỗi xảy ra khi tải hồ sơ sức khỏe!');
                });
        },
        luuHoSo() {
            baseRequest
                .post('khach-hang/ho-so/create', this.ho_so)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.ho_so = {};
                        this.loadDataHoSo();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(() => {
                    toaster.error('Đã xảy ra lỗi khi lưu hồ sơ!');
                });
        },
        loadTinhTrangHuyetAp() {
            const hatt = parseFloat(this.ho_so.huyet_ap_tam_truong);

            if (isNaN(hatt) || hatt < 60) {
                this.ho_so.tinh_trang_huyet_ap = "Giá trị không hợp lệ phải lớn hơn 60mmHg và nhỏ hơn 130mmHg";
            } else if (hatt < 80) {
                this.ho_so.tinh_trang_huyet_ap = "Huyết áp bình thường";
            } else if (hatt < 90) {
                this.ho_so.tinh_trang_huyet_ap = "Có dấu hiệu tăng huyết áp";
            } else if (hatt < 100) {
                this.ho_so.tinh_trang_huyet_ap = "Tăng huyết áp độ 1 (nhẹ)";
            } else if (hatt < 110) {
                this.ho_so.tinh_trang_huyet_ap = "Tăng huyết áp độ 2 (trung bình)";
            } else {
                this.ho_so.tinh_trang_huyet_ap = "Tăng huyết áp độ 3 (nặng)";
            }
        },
        loadOxyTrongMau() {
            const oxy = parseFloat(this.ho_so.nong_do_oxy);

            if (isNaN(oxy) || oxy < 0 || oxy > 100) {
                this.ho_so.tinh_trang_oxy = "Giá trị không hợp lệ";
            } else if (oxy >= 95) {
                this.ho_so.tinh_trang_oxy = "Bình thường";
            } else if (oxy >= 90) {
                this.ho_so.tinh_trang_oxy = "Thiếu oxy trong máu";
            } else {
                this.ho_so.tinh_trang_oxy = "Suy hô hấp";
            }
        },
        loadDataHoSo() {
            baseRequest.get('khach-hang/ho-so/data')
                .then((res) => {
                    this.list_ho_so = res.data.data;
                });
        },
        formatDateVN(dateString) {
            return new Date(dateString).toLocaleDateString('vi-VN', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            });
        },
        calculateBMI() {
            const chieu_cao = parseFloat(this.ho_so.chieu_cao);
            const can_nang = parseFloat(this.ho_so.can_nang);

            if (chieu_cao > 0 && can_nang > 0) {
                const bmi = (can_nang / (chieu_cao * chieu_cao)).toFixed(2);
                this.ho_so.bmi = bmi;

                // Phân loại tình trạng sức khỏe
                if (bmi < 15) {
                    this.ho_so.tinh_trang_suc_khoe = 'Thiếu cân rất nặng';
                } else if (bmi < 16) {
                    this.ho_so.tinh_trang_suc_khoe = 'Thiếu cân nặng';
                } else if (bmi < 18.5) {
                    this.ho_so.tinh_trang_suc_khoe = 'Thiếu cân';
                } else if (bmi < 25) {
                    this.ho_so.tinh_trang_suc_khoe = 'Bình thường';
                } else if (bmi < 30) {
                    this.ho_so.tinh_trang_suc_khoe = 'Thừa cân';
                } else if (bmi < 35) {
                    this.ho_so.tinh_trang_suc_khoe = 'Béo phì độ I';
                } else if (bmi < 40) {
                    this.ho_so.tinh_trang_suc_khoe = 'Béo phì độ II';
                } else {
                    this.ho_so.tinh_trang_suc_khoe = 'Béo phì độ III';
                }
            } else {
                this.ho_so.bmi = '';
                this.ho_so.tinh_trang_suc_khoe = 'Vui lòng nhập chiều cao và cân nặng.';
            }
        },
        getProfile() {
            baseRequest.get('khach-hang/thong-tin')
                .then((res) => {
                    this.profile = res.data.data;
                    this.calculateAge();
                });
        },
        updateProfile() {
            baseRequest.post('khach-hang/update-thong-tin', this.profile)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.getProfile();
                    } else {
                        toaster.error(res.data.message);
                    }
                });
        },
        updateMatKhau() {
            console.log("Dữ liệu gửi lên:", this.update_password); // Debug dữ liệu

            if (!this.update_password.old_password || !this.update_password.password || !this.update_password.re_password) {
                toaster.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (this.update_password.password !== this.update_password.re_password) {
                toaster.error("Mật khẩu mới và nhập lại mật khẩu không khớp!");
                return;
            }

            baseRequest.post('khach-hang/update-mat-khau', this.update_password)
                .then((res) => {
                    console.log("Phản hồi từ server:", res.data); // Debug phản hồi từ server

                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.update_password = {}; // Xóa dữ liệu nhập sau khi đổi mật khẩu thành công
                        this.getProfile();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error("Lỗi đổi mật khẩu:", err);
                    toaster.error("Đã xảy ra lỗi, vui lòng thử lại!");
                });
        },

        calculateAge() {
            if (this.profile.ngay_sinh) {
                const ngay_sinh = new Date(this.profile.ngay_sinh);
                const now = new Date();
                let tuoi = now.getFullYear() - ngay_sinh.getFullYear();
                const monthDifference = now.getMonth() - ngay_sinh.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < ngay_sinh.getDate())) {
                    tuoi--;
                }
                this.tuoi = tuoi;
            } else {
                this.tuoi = null;
            }
        },
    },
}
</script>