<template>
    <div class="card  shadow-lg p-3 mb-5 bg-body rounded">
        <div class="card-header mt-2 p-3 bg-light rounded">
            <div class="row align-items-center">
                <div class="col-lg-3 col-md-12 mb-2 mb-lg-0">
                    <h5 class="mb-0"><b>Danh Sách Tin Nhắn</b></h5>
                </div>
                <div class="col-lg-5 col-md-8 col-12 mb-2 mb-lg-0">
                    <div class="search-bar w-100">
                        <div class="position-relative">
                            <input v-model="searchQuery" type="text" class="form-control search-control"
                                placeholder="Tìm kiếm tin nhắn...">
                            <span class="position-absolute top-50 translate-middle-y end-0 me-2 text-muted"
                                style="cursor: pointer;">
                                <i class='bx bx-search'></i>
                            </span>
                            <span class="position-absolute top-50 translate-middle-y end-0 me-2 text-muted"
                                style="cursor: pointer;">
                                <i class='bx bx-x'></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-2 mb-lg-0">
                    <div class="d-flex align-items-center">
                        <span class="me-2">Sắp xếp:</span>
                        <select v-model="sortOrder" class="form-select">
                            <option value="desc">Mới nhất</option>
                            <option value="asc">Cũ nhất</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>#</th>
                            <th>Tên Người Dùng</th>
                            <th>Mã Người Dùng</th>
                            <th>Thời Gian</th>
                            <th>Tình Trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, key) in filteredAndSortedNguoiGui">
                            <tr class="align-middle">
                                <th @click="loadChat(value.id_khach_hang)" class="align-middle text-center">{{ key + 1
                                    }}</th>
                                <td @click="loadChat(value.id_khach_hang)" class="align-middle text-center"
                                    style="white-space: normal; word-wrap: break-word;">
                                    {{ value.ho_va_ten }}
                                </td>
                                <td class="align-middle text-center"
                                    style="white-space: normal; word-wrap: break-word;">
                                    {{ value.id_khach_hang }}
                                </td>
                                <td class="align-middle text-center"
                                    style="white-space: normal; word-wrap: break-word;">
                                    {{ formatDateVN(value.created_at) }}
                                </td>
                                <td class="text-center">
                                    <button v-if="value.tinh_trang == 0" class="btn btn-danger">Chưa Trả Lời</button>
                                    <button v-else-if="value.tinh_trang == 1" class="btn btn-info">Đã Gửi Chuyên
                                        Gia</button>
                                    <button v-else="value.tinh_trang == 2" class="btn btn-success">Đã Trả Lời</button>
                                </td>
                                <td>
                                    <button v-on:click="loadChuyenGia(value.id_khach_hang)"
                                        class="btn btn-outline-primary w-100">
                                        Gửi Chuyên Gia Tư Vấn
                                    </button>
                                </td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi tiết tin nhắn với khách hàng</h5>
                    <button type="button" class="btn-close" @click="showModal = false"></button>
                </div>
                <div class="modal-body">
                    <div class="chat-box">

                        <div v-for="(tin_nhan, index) in selectednguoiGui" :key="index" class="message-sender">
                            <p><strong> Người Gửi: </strong> {{ tin_nhan.nguoi_gui }}</p>
                            <p>{{ tin_nhan.tin_nhan }}</p>
                            <small>{{ formatDateVN(tin_nhan.created_at) }}</small>
                        </div>
                    </div>

                    <div class="message-input-container">
                        <input v-model="message_create" type="text" class="form-control message-input"
                            placeholder="Nhập tin nhắn của bạn...">
                        <button class="btn btn-primary" @click="sendMessage">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal chọn chuyên gia -->
    <div v-if="showChuyenGiaModal" class="modal fade show" style="display: block;" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chọn Chuyên Gia</h5>
                    <button type="button" class="btn-close" @click="showChuyenGiaModal = false"></button>
                </div>
                <div class="modal-body">
                    <div class="list-group">
                        <button v-for="chuyenGia in listChuyenGia" :key="chuyenGia.id"
                            class="list-group-item list-group-item-action" @click="selectChuyenGia(chuyenGia.id)">
                            {{ chuyenGia.ten_chuyen_gia }}
                        </button>
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
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            searchQuery: '',
            sortOrder: 'desc',
            selectednguoiGui: [],
            showModal: false,
            currentKhachHangId: null,
            message_create: '',
            list_nguoi_gui: [],
            listChuyenGia: [],
            showChuyenGiaModal: false,
            selectedKhachHangId: null,
        }
    },

    mounted() {
        this.loadData();
    },
    computed: {
        filteredAndSortedNguoiGui() {
            let uniqueNguoiGui = this.list_nguoi_gui.reduce((acc, current) => {
                const existing = acc.find(item => item.id_khach_hang === current.id_khach_hang);
                if (!existing) {
                    acc.push(current);
                }
                return acc;
            }, []);
            let filteredNguoiGui = uniqueNguoiGui.filter(nguoiGui => {
                // Sử dụng ho_va_ten thay vì ten_khach_hang
                const hoVaTen = nguoiGui.ho_va_ten || ''; // Nếu không có, gán chuỗi rỗng
                return hoVaTen.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
            if (this.sortOrder === 'desc') {
                return filteredNguoiGui.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else {
                return filteredNguoiGui.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
        }
    },
    methods: {
        loadData() {
            baseRequest
                .get('admin/tin-nhan/data')
                .then((res) => {
                    this.list_nguoi_gui = res.data.data
                })
            console.log(this.list_nguoi_gui);

        },
        formatDateVN(dateString) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        shownguoiGui(value) {
            this.selectednguoiGui = value;
            this.showModal = true;
        },
        loadChat(id_khach_hang) {
            baseRequest
                .get(`khach-hang/tin-nhan/getdata?id_khach_hang=${id_khach_hang}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('chia_khoa_16')
                    }
                })
                .then((res) => {
                    if (res.data) {
                        this.selectednguoiGui = res.data.data;
                        this.currentKhachHangId = id_khach_hang;
                        console.log('Khách hàng được chọn:', this.currentKhachHangId);
                        this.showModal = true;
                    }
                });
        },
        sendMessage() {
            if (!this.currentKhachHangId) {
                toaster.error('Không có khách hàng được chọn.');
                return;
            }

            const messageData = {
                tin_nhan: this.message_create,
                id_khach_hang: this.currentKhachHangId,
                nguoi_gui: this.adminName
            };

            console.log('ID khách hàng khi gửi tin nhắn:', this.currentKhachHangId);

            baseRequest
                .post('admin/tin-nhan/create', messageData)
                .then((res) => {
                    if (res.data.status) {
                        this.loadChat(this.currentKhachHangId);
                        this.message_create = '';
                        this.loadData();
                    }
                });
        },
        guiChuyenGia(id_khach_hang) {
            baseRequest
                .put('admin/tin-nhan/gui-chuyen-gia', { id_khach_hang: id_khach_hang })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData(); // Load lại dữ liệu sau khi cập nhật thành công
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err); // Hiển thị lỗi nếu xảy ra
                });
        },
        loadChuyenGia(idKhachHang) {
            this.selectedKhachHangId = idKhachHang; // Gán ID Khách Hàng
            baseRequest.get('admin/chuyen-gia/data')
                .then((res) => {
                    this.listChuyenGia = res.data.data; // Tải danh sách chuyên gia
                    this.showChuyenGiaModal = true; // Hiển thị modal
                })
                .catch((err) => {
                    console.error(err);
                    toaster.error("Không thể tải danh sách chuyên gia.");
                });
        },
        selectChuyenGia(chuyenGiaId) {
            console.log('ID Khách Hàng:', this.selectedKhachHangId);
            console.log('ID Chuyên Gia:', chuyenGiaId);
            const payload = {
                id_khach_hang: this.selectedKhachHangId,
                id_chuyen_gia: chuyenGiaId
            };
            baseRequest.put('admin/tin-nhan/cap-nhat-chuyen-gia', payload)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData(); // Load lại danh sách tin nhắn
                        this.showChuyenGiaModal = false; // Đóng modal
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toaster.error("Có lỗi xảy ra khi cập nhật chuyên gia.");
                });
            // .then(response => {
            //     console.log('Success:', response.data);
            // })
            // .catch(error => {
            //     console.error('Error:', error.response.data);
            // });
        },
        guiChuyenGia(id_khach_hang) {
            this.selectedKhachHangId = id_khach_hang;
            this.loadChuyenGia();
        }
    },
}
</script>
<style>
.chat-box {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Tạo khoảng cách giữa các tin nhắn */
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

.message-sender {
    justify-content: flex-start;
}
</style>