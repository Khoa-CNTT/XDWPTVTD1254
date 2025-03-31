<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand">
                <router-link to="/">
                    <div class="topbar-logo-header">
                        <div class="">
                            <img src="https://cdnphoto.dantri.com.vn/wl1blyIlFm4F8ZrxcXF_L0uCHAU=/thumb_w/1020/2022/09/17/bieu-tuong-nganh-y-1663430414672.png"
                                class="logo-icon" alt="logo icon">
                        </div>
                        <div class="">
                            <router-link to="/">
                                <h4 class="logo-text">Health Care</h4>
                            </router-link>
                        </div>
                    </div>
                </router-link>

                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
                <div class="text-center flex-grow-1">
                    <h2>CHUYÊN GIA TƯ VẤN HEALTHCARE</h2>
                </div>
                <div class="user-box dropdown">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                            class="user-img" alt="user avatar">
                        <div class="user-info ps-3">
                            <p class="user-name mb-0">{{ ten_chuyen_gia }}</p>
                            <p class="designattion mb-0">Chuyên Gia Tư Vấn</p>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a v-on:click="dangXuat()" class="dropdown-item"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
                        </li>
                        <li><a v-on:click="dangXuatAll()" class="dropdown-item"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất Tất Cả</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            ten_chuyen_gia: '',
        }
    },
    mounted() {
        this.ten_chuyen_gia = localStorage.getItem('ten_chuyen_gia')

    },
    methods: {
        dangXuat() {
            baseRequest
                .get('chuyen-gia/dang-xuat')
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        window.localStorage.removeItem('chia_khoa_16');
                        window.localStorage.removeItem('ten_chuyen_gia');
                        this.$router.push('/chuyen-gia/dang-nhap');
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        dangXuatAll() {
            baseRequest
                .get('chuyen-gia/dang-xuat-all')
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        window.localStorage.removeItem('chia_khoa_16');
                        this.$router.push('/');
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        }
    },
}
</script>
<style></style>