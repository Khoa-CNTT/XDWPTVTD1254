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
                <div class="search-bar flex-grow-1">
                    <div class="row text-center">
                        <h1>Sức khỏe của bạn - Niềm vui của tôi</h1>
                    </div>
                </div>
                <template v-if="auth">
                    <div class="top-menu ms-auto">
                        <ul class="navbar-nav align-items-center">
                            <li class="dropdown dropdown-large">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span
                                        class="alert-count">{{ soThongBao }}</span>
                                    <i class='bx bx-bell'></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                          
                                        <div class="msg-header">
                                            <p class="msg-header-title">Thông Báo</p>
                                        </div>
                          
                                    <div class="header-message-list">
                                        <a v-for="(value, key) in list_thong_bao" :key="key" class="dropdown-item"
                                            >
                                            <div class="d-flex align-items-center" data-bs-toggle="modal"
                                                data-bs-target="#chiTietThongBao" @click="openThongBao(value)">
                                                <img :src="value.hinh_anh" class="msg-avatar" alt="">
                                                <div class="msg-content">
                                                    <h6 class="msg-name">{{ value.tieu_de }}</h6>
                                                    <span class="msg-time">{{ formatDateVN(value.created_at) }}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bx bx-comment">
                                    </i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end" data-bs-auto-close="true">
                                    <div class="chat-box">
                                        <div class="message-sender" v-for="(v, index) in list_tin_nhan" :key="index">
                                            <p style="color: blue;">{{ v.nguoi_gui }}</p>
                                            <p>{{ v.tin_nhan }}</p>
                                            <small style="color: gray;">{{ formatDateVN(v.created_at) }}</small>
                                        </div>
                                    </div>
                                    <button @click="ketThucTroChuyen()" class="btn btn-outline-warning w-100 rounded-0">
                                        <i class="fa-solid fa-stop"></i>
                                        Kết thúc cuộc trò chuyện
                                    </button>
                                    <div class="message-input-container">
                                        <input v-model="message_create.tin_nhan" type="text rounded-0"
                                            class="message-input" placeholder="Nhập tin nhắn của bạn...">
                                        <button class="btn btn-primary rounded-0"
                                            v-on:click="sendMessage()">Gửi</button>

                                        <button class="btn btn-danger rounded-0" v-on:click="deleteChat()">Xóa
                                            Chat</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="user-box dropdown">
                        <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                                class="user-img" alt="user avatar">
                            <div class="user-info ps-3">
                                <p class="user-name mb-0">{{ name_kh }}</p>
                                <p class="designattion mb-0">Người dùng</p>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <router-link to="/profile">
                                    <a class="dropdown-item">
                                        <i class="bx bx-user"></i><span>Cá Nhân</span>
                                    </a>
                                </router-link>
                            </li>
                            <li>
                                <div class="dropdown-divider mb-0"></div>
                            </li>
                            <li><a v-on:click="dangXuat()" class="dropdown-item"><i
                                        class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
                            </li>
                            <li><a v-on:click="dangXuatAll()" class="dropdown-item"><i
                                        class='bx bx-log-out-circle'></i><span>Đăng Xuất Tất Cả</span></a>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div class="user-box">
                        <a class="d-flex align-items-center">
                            <router-link to="/dang-nhap">
                                <button type="button" class="btn btn-primary me-2"><i class="bx bxs-lock-open"></i> Đăng
                                    Nhập</button>
                            </router-link>
                            <router-link to="/dang-ky">
                                <button type="button" class="btn btn-secondary"><i
                                        class="fa-solid fa-right-to-bracket fa-2xs"></i> Đăng Ký</button>
                            </router-link>
                        </a>
                    </div>
                </template>
            </nav>
        </div>
    </header>
    <div class="modal fade" id="chiTietThongBao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ selectedThongBao.tieu_de || '' }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- Modal Body -->
                <div class="modal-body">
                    <div class="modal-image-wrapper">
                        <img class="modal-image" v-bind:src="selectedThongBao.hinh_anh" alt="Hình ảnh thông báo">
                    </div>
                    <p class="modal-text">{{ selectedThongBao.noi_dung || '' }}</p>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ratingModalLabel">Nếu bạn thấy hữu ích hãy đánh giá cho chuyên gia tư
                        vấn
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="rating-section">
                        <div class="stars">
                            <i class="fa-solid fa-star" :class="rating >= 1 ? 'active' : ''" @click="setRating(1)"></i>
                            <i class="fa-solid fa-star" :class="rating >= 2 ? 'active' : ''" @click="setRating(2)"></i>
                            <i class="fa-solid fa-star" :class="rating >= 3 ? 'active' : ''" @click="setRating(3)"></i>
                            <i class="fa-solid fa-star" :class="rating >= 4 ? 'active' : ''" @click="setRating(4)"></i>
                            <i class="fa-solid fa-star" :class="rating >= 5 ? 'active' : ''" @click="setRating(5)"></i>
                        </div>
                        <p>Bạn đã chọn {{ rating }} sao</p>
                        <textarea class="form-control" v-model="feedback"
                            placeholder="Viết ý kiến của bạn..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="submitRating">Gửi đánh giá</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from "../../core/baseRequest";
const toaster = createToaster({ position: "top-right" });
import kiemTraKhachHang from "../../router/kiemTraKhachHang.js";

export default {
    data() {
        return {
            auth: false,
            name_kh: localStorage.getItem("ten_kh") || "",
            thong_tin_search: "",
            list_thong_bao: [],
            list_tin_nhan: [],
            message_create: {},
            selectedThongBao: {},
            soThongBao: 0,
            user: null,
            rating: 0,
            feedback: "",
            idChuyenGia: null
        };
    },
    mounted() {
        this.checkLogin();
        this.loadDataThongBao();
        this.loadDataTinNhan();
    },
    watch: {
        selectedThongBao(newValue) {
            console.log("Dữ liệu thông báo được cập nhật:", newValue);
        }
    },
    methods: {
        async checkLogin() {
            try {
                const res = await baseRequest.post("khach-hang/check-login");
                this.auth = res.data.status;
            } catch (error) {
                console.error("Lỗi kiểm tra đăng nhập:", error);
            }
        },
        timKiem() {
            this.$router.push({ name: "timKiem", params: { thong_tin: this.thong_tin_search } });
        },
        async dangXuat(url = "khach-hang/dang-xuat") {
            try {
                const res = await baseRequest.get(url);
                if (res.data.status) {
                    toaster.success("Thông báo<br>" + res.data.message);
                    ["chia_khoa_16", "ten_kh"].forEach(key => localStorage.removeItem(key));
                    this.auth = false;
                    this.$router.push("/");
                } else {
                    toaster.error("Thông báo<br>" + res.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi đăng xuất:", error);
            }
        },
        dangXuatAll() {
            this.dangXuat("khach-hang/dang-xuat-all");
        },
        async loadDataThongBao() {
            try {
                const res = await baseRequest.get("khach-hang/thong-bao/data");
                if (res.data?.data) {
                    this.list_thong_bao = res.data.data;
                    this.soThongBao = this.list_thong_bao.length;
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thông báo:", error);
            }
        },
        formatDateVN(dateString) {
            return new Date(dateString).toLocaleDateString("vi-VN", {
                year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
            });
        },
        openThongBao(thongBao) {
            this.selectedThongBao = thongBao || {};
        },
        async loadDataTinNhan() {
            try {
                const res = await baseRequest.get("khach-hang/tin-nhan/data");
                this.list_tin_nhan = res.data.data;
                this.$nextTick(this.scrollToBottom);
            } catch (error) {
                console.error("Lỗi khi lấy tin nhắn:", error);
            }
        },
        async sendMessage() {
            try {
                const res = await baseRequest.post("khach-hang/tin-nhan/create", this.message_create);
                if (res.data.status) {
                    this.loadDataTinNhan();
                    this.message_create.tin_nhan = "";
                }
            } catch (error) {
                console.error("Lỗi khi gửi tin nhắn:", error);
            }
        },
        scrollToBottom() {
            this.$refs.bottom?.scrollIntoView({ behavior: "smooth" });
        },
        async deleteChat() {
            try {
                const res = await baseRequest.delete("khach-hang/tin-nhan/delete", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("chia_khoa_16")}` }
                });
                res.data.status ? toaster.success(res.data.message) : toaster.error(res.data.message);
                this.loadDataTinNhan();
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi xóa lịch sử chat!");
            }
        },
        async ketThucTroChuyen() {
            try {
                const res = await baseRequest.post("khach-hang/ket-thuc-tro-chuyen");
                if (res.data.status) {
                    toaster.success("Thông báo<br>" + res.data.message);
                    this.idChuyenGia = res.data.id_chuyen_gia;
                    new bootstrap.Modal(document.getElementById("ratingModal")).show();
                } else {
                    toaster.error("Thông báo<br>" + res.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi kết thúc trò chuyện:", error);
                toaster.error("Có lỗi xảy ra khi kết thúc trò chuyện!");
            }
        },
        setRating(stars) {
            this.rating = stars;
        },
        async submitRating() {
            if (!this.idChuyenGia) return toaster.error("Không tìm thấy thông tin chuyên gia!");
            try {
                const res = await baseRequest.post("khach-hang/danh-gia", {
                    id_chuyen_gia: this.idChuyenGia,
                    noi_dung_danh_gia: this.feedback,
                    sao: this.rating
                });
                if (res.data.status) {
                    toaster.success("Cảm ơn bạn đã đánh giá!");
                    this.rating = this.feedback = "";
                    bootstrap.Modal.getInstance(document.getElementById("ratingModal")).hide();
                } else {
                    toaster.error("Không thể gửi đánh giá!");
                }
            } catch (error) {
                console.error("Lỗi khi gửi đánh giá:", error);
                toaster.error("Có lỗi xảy ra khi gửi đánh giá!");
            }
        }
    }
};
</script>
<style scoped>
/* ⭐️ Đánh giá sao */
.stars {
    display: flex;
    gap: 5px;
    cursor: pointer;
}

.stars i {
    font-size: 30px;
    color: gray;
    transition: color 0.2s ease;
}

.stars i.active {
    color: gold;
}

/* 📝 Ô nhập phản hồi */
.feedback textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
}

/* 🎨 Hộp thoại (Modal) */
.modal-header,
.modal-footer {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e9ecef;
    background-color: #f8f9fa;
}

.modal-footer {
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
}

.modal-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
}

.modal-body {
    padding: 2rem 1.5rem;
    text-align: center;
}

.modal-image-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}

.modal-image {
    max-width: 50%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    text-align: left;
    margin-top: 1rem;
}

/* 💬 Hộp chat */
.chat-box {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chat-box p {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
}

.chat-box small {
    font-size: 12px;
    color: #888;
}

.message {
    display: flex;
    margin-bottom: 10px;
    max-width: 70%;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    word-wrap: break-word;
}

/* 🎭 Phân biệt tin nhắn */
.message-sender {
    align-self: flex-start;
    background: #f0f0f0;
    color: #333;
}

.message-user {
    align-self: flex-end;
    background: #007bff;
    color: white;
}

/* ✏️ Ô nhập tin nhắn */
.message-input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
    background: #f9f9f9;
}

.message-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
}

.send-button {
    margin-left: 10px;
    padding: 10px 15px;
    background: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

.send-button:hover {
    background: #0056b3;
}

.header-message-list {
    max-width: 350px;
    /* Điều chỉnh kích thước theo nhu cầu */
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 10px;
    overflow: hidden;
}

.d-flex {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
}

.msg-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
}

.msg-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.msg-time {
    font-size: 12px;
    color: gray;
    position: absolute;
    top: -2px;
    /* Đẩy thời gian lên trên */
    right: 0;
    white-space: nowrap;
}

.msg-name {
    font-size: 14px;
    font-weight: bold;
    word-wrap: break-word;
    /* Hiển thị đầy đủ nội dung */
    white-space: normal;
    /* Cho phép xuống dòng nếu cần */
}
</style>
