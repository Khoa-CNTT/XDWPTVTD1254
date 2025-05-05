<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                <div class="col mx-auto">
                    <div class="my-4 text-center">
                        <img src="https://cdnphoto.dantri.com.vn/wl1blyIlFm4F8ZrxcXF_L0uCHAU=/thumb_w/1020/2022/09/17/bieu-tuong-nganh-y-1663430414672.png"
                            width="180" alt="" />
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="border p-4 rounded">
                                <div class="text-center">
                                    <h3 class=""><b>HEALTH CARE</b></h3>
                                    <h4>Đăng nhập Hệ thống Quản Lý</h4>
                                </div>
                                <div class="login-separater text-center mb-4">
                                    <hr />
                                </div>
                                <div class="form-body">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label">Username</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent">
                                                    <i class="fa-solid fa-envelope"></i>
                                                </div>
                                                <input v-model="tai_khoan.username" type="text"
                                                    class="form-control border-end-0">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Password</label>
                                            <div class="input-group">
                                                <div class="input-group-text bg-transparent"><i
                                                        class="fa-solid fa-lock"></i></div>
                                                <input v-model="tai_khoan.password" type="password"
                                                    class="form-control border-end-0">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button v-on:click="dangNhap()" type="button" class="btn btn-primary"><i
                                                        class="fa-solid fa-lock-open"></i>Đăng Nhập</button>
                                            </div>
                                        </div>
                                    </div>
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
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from "../../../core/baseRequest";

export default {
    data() {
        return {
            tai_khoan: {},
        }
    },
    methods: {
        dangNhap() {
            axios
                .post('http://127.0.0.1:8000/api/admin/dang-nhap', this.tai_khoan)
                .then((res) => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);                        // Lưu res.data.chia_khoa
                        localStorage.setItem('chia_khoa_16', res.data.chia_khoa);
                        localStorage.setItem('ten_admin', res.data.ten_admin);
                        localStorage.setItem('is_master', res.data.is_master);
                        const is_master = parseInt(res.data.is_master, 10);
                        if (is_master === 0) {
                            this.$router.push('/admin/nhan-vien');
                        } else if (is_master === 1) {
                            this.$router.push('/admin/tin-nhan');
                        } else if (is_master === 2) {
                            this.$router.push('/admin/bai-viet');
                        } else {
                            toaster.warning('Quyền truy cập không xác định!');
                        }
                    } else if (res.data.status == 0) {
                        toaster.error(res.data.message);
                    } else {
                        toaster.warning(res.data.message);
                    }
                });
        }
    },
}
</script>
<style></style>