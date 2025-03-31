<template>
    <div class="login-background">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="text-center my-4">
                        <img src="https://cdnphoto.dantri.com.vn/wl1blyIlFm4F8ZrxcXF_L0uCHAU=/thumb_w/1020/2022/09/17/bieu-tuong-nganh-y-1663430414672.png"
                            width="100" alt="">
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h3 class="text-center">Đăng Kí Tài Khoản</h3>
                            <p class="text-center">
                                Bạn đã có tài khoản? 
                                <router-link to="/dang-nhap"> <strong>Đăng Nhập</strong> </router-link>
                            </p>
                            <hr>
                            <form class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">Họ Và Tên</label>
                                    <input type="text" v-model="khach_hang_create.ho_va_ten" class="form-control"
                                        placeholder="Nhập họ và tên">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="khach_hang_create.email" class="form-control"
                                        placeholder="Nhập Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Số Điện Thoại</label>
                                    <input type="tel" v-model="khach_hang_create.so_dien_thoai" class="form-control"
                                        placeholder="Nhập Số điện thoại">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mật Khẩu</label>
                                    <input type="password" v-model="khach_hang_create.password" class="form-control"
                                        placeholder="Nhập Mật Khẩu">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Nhập Lại Mật Khẩu</label>
                                    <input type="password" v-model="khach_hang_create.re_password" class="form-control"
                                        placeholder="Nhập lại Mật Khẩu">
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Ngày Sinh</label>
                                    <input type="date" v-model="khach_hang_create.ngay_sinh" class="form-control">
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Giới Tính</label>
                                    <select v-model="khach_hang_create.gioi_tinh" class="form-select">
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <button type="button" v-on:click="actionDangKy()" class="btn btn-primary w-100">
                                        <i class="bx bx-user"></i> Đăng Ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p class="text-center mt-3">
                        <router-link to="/"> <i class="bx bx-arrow-back"></i> Quay lại Trang Chủ </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../core/baseRequest';

const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            khach_hang_create: {}
        }
    },
    mounted() {
        document.body.style.backgroundImage = "url('https://png.pngtree.com/background/20210710/original/pngtree-medical-security-technology-sense-blue-banner-picture-image_1002464.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100vh";
    },
    beforeUnmount() {
        // Xóa background khi rời khỏi trang
        document.body.style.backgroundImage = "";
    },
    methods: {
        actionDangKy() {
            baseRequest
                .post('khach-hang/create', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.khach_hang_create = {};
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toaster.error(`Lỗi: ${error.response.data.message || 'Đã có lỗi xảy ra'}`);
                    } else if (error.request) {
                        toaster.error('Không thể kết nối đến server. Vui lòng thử lại sau.');
                    } else {
                        toaster.error(`Lỗi: ${error.message}`);
                    }
                });
        }
    },
}
</script>

<style>
/* Định dạng chung */
.card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* Căn chỉnh khoảng cách input */
.form-control,
.form-select {
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
}

/* Định dạng liên kết */
a {
    text-decoration: none;
    color: #007bff;
}

a:hover {
    color: #0056b3;
}
</style>
