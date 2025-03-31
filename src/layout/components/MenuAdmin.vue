<template>
    <div class="nav-container primary-menu">
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item" v-if="isMaster === 0 || isMaster === 2">
                    <router-link to="/admin/bai-viet">
                        <a class="nav-link" href="/admin/bai-viet">
                            <div class="parent-icon"><i class="fa-brands fa-product-hunt"></i></div>
                            <div class="menu-title">Bài Viết</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item" v-if="isMaster === 0 || isMaster === 2">
                    <router-link to="/admin/thong-bao">
                        <a class="nav-link" href="/admin/thong-bao">
                            <div class="parent-icon"><i class="fa-solid fa-bell"></i></div>
                            <div class="menu-title">Thông Tin & Thông Báo</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item" v-if="isMaster === 0 || isMaster === 1">
                    <router-link to="/admin/tin-nhan">
                        <a class="nav-link" href="/admin/tin-nhan">
                            <div class="parent-icon"><i class="fa-solid fa-message"></i></div>
                            <div class="menu-title">Tin Nhắn</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/phan-tich-bao-cao">
                        <a class="nav-link" href="/admin/phan-tich-bao-cao">
                            <div class="parent-icon"><i class="fa-solid fa-chart-simple"></i></div>
                            <div class="menu-title">Phân Tích & Báo Cáo</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/giam-sat-dich-benh" v-if="isMaster === 0">
                        <a class="nav-link" href="/admin/giam-sat-dich-benh">
                            <div class="parent-icon"><i class="fa-solid fa-bacteria"></i></div>
                            <div class="menu-title">Giám Sát Dịch Bệnh</div>
                        </a>
                    </router-link>
                </li>

                <li class="nav-item dropdown" v-if="isMaster === 0">
                    <a class="nav-link" href="#">
                        <div class="parent-icon"><i class="fa-solid fa-user-nurse"></i></div>
                        <div class="menu-title">Tài Khoản Y Tế</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link to="/admin/nhan-vien">
                                <a class="dropdown-item">Tài Khoản Admin</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/chuyen-gia">
                                <a class="dropdown-item">Tài Khoản Chuyên Gia Tư Vấn</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/co-quan">
                                <a class="dropdown-item">Tài Khoản Cơ Quan Y Tế</a>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <li class="nav-item" v-if="isMaster === 0">
                    <router-link to="/admin/khach-hang">
                        <a class="nav-link" href="/admin/khach-hang">
                            <div class="parent-icon"><i class="fa-solid fa-user"></i></div>
                            <div class="menu-title">Tài Khoản Người Dùng</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/danh-gia">
                        <a class="nav-link" href="/admin/danh-gia">
                            <div class="parent-icon"><i class="fa-solid fa-star"></i></div>
                            <div class="menu-title">Đánh Giá</div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isMaster: null
            };
        },
        mounted() {
            this.isMaster = parseInt(localStorage.getItem('is_master'));
        }
    }
    </script>
<style>
.nav-item.dropdown {
  position: relative;
}

.nav-item .dropdown-menu {
  display: none; /* Ẩn menu con mặc định */
  position: absolute;
  top: 100%;
  left: 0;
  background: #f8f9fa;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.nav-item .dropdown-menu li {
  padding: 10px 20px;
}

.nav-item .dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
}

.nav-item:hover .dropdown-menu {
  display: block; /* Hiển thị menu con khi lia chuột */
}

.nav-item .dropdown-menu li:hover {
  background-color: #e9ecef; /* Màu nền khi hover */
}

</style>