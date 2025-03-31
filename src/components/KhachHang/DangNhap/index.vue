<template>
    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
        <div class="col mx-auto">
            <div class="my-4 text-center">
                <img src="https://cdnphoto.dantri.com.vn/wl1blyIlFm4F8ZrxcXF_L0uCHAU=/thumb_w/1020/2022/09/17/bieu-tuong-nganh-y-1663430414672.png" width="180" alt="">
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="border p-4 rounded">
                        <div class="text-center">
                            <h3 class="">Đăng Nhập</h3>
                            <p>Bạn chưa có tài khoản? 
                                <router-link to="/dang-ky">
                                    <a href="/dang-ky">Đăng Ký</a> 
                                </router-link>
                            </p>
                        </div>
                        <div class="login-separater text-center mb-4">
                            <hr>
                        </div>
                        <div class="form-body">
                            <form class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="khach_hang.email" class="form-control"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang.password" class="form-control"
                                            placeholder="Nhập vào Mật Khẩu">
                                    </div>
                                </div>
                                <div class="col-12 text-end">
                                            <router-link to="/quen-mat-khau">
                                                <a href="">Quên mật khẩu ?</a>
                                            </router-link>
                                        </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="button" v-on:click="actionDangNhap()" class="btn btn-primary"><i
                                                class="bx bx-user"></i>Đăng Nhập</button>
                                    </div>
                                </div>
                            </form>
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
import baseRequest from '../../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            khach_hang: {}
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
        document.body.style.backgroundImage = "";
    },
    methods: {
        actionDangNhap() {
            baseRequest
                .post('khach-hang/login', this.khach_hang)
                .then((res) => {
                    if (res.data.status == 1) {
                        console.log(res.data.chia_khoa);
                        toaster.success(res.data.message);
                        localStorage.setItem('chia_khoa_16', res.data.chia_khoa);
                        localStorage.setItem('ten_kh', res.data.ten_kh);
                        this.khach_hang = {};
                        this.$router.push('/');
                    } else if (res.data.status == 2) {
                        toaster.warning(res.data.message);
                    } else {
                        toaster.error(res.data.message);
                    }
                })
        },
    },
}
</script>
<style>
.card {
    background: rgba(255, 255, 255, 0.9); /* Tạo hiệu ứng mờ */
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
