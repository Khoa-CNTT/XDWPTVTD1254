<template>
    <div class="container">
        <div class="row ">
            <div class="col-12">
                <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                    <div class="card-header mt-2 p-3 bg-light rounded">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-md-12 mb-2 mb-lg-0">
                                <h5 class="mb-0"><b>Danh Sách Bài Viết</b></h5>
                            </div>
                            <div class="col-lg-5 col-md-8 col-12 mb-2 mb-lg-0">
                                <div class="search-bar w-100">
                                    <div class="position-relative">
                                        <input v-model="searchQuery" type="text" class="form-control search-control"
                                            placeholder="Tìm kiếm bài viết...">
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
                            <div class="col-lg-2 col-md-12 col-6 text-end">
                                <button class="btn btn-outline-primary w-100" data-bs-toggle="modal"
                                    data-bs-target="#themmoimodal">
                                    Thêm mới
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr class="text-center align-middle">
                                        <th>#</th>
                                        <th>Tên Bài Viết</th>
                                        <th>Hình Ảnh</th>
                                        <th>Mô Tả </th>
                                        <th>Ngày Tạo</th>
                                        <th>Tình Trạng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, key) in filteredAndSortedBaiViet">
                                        <tr class="align-middle">
                                            <th class="align-middle text-center">{{ key + 1 }}</th>
                                            <td class="align-middle"
                                                style="white-space: normal; word-wrap: break-word;">{{
                                                    value.ten_bai_viet }}</td>
                                            <td class="align-middle text-center">
                                                <img v-bind:src="value.hinh_anh" class="img-fluid"
                                                    style="height: 100px; width: 100%;" alt="">
                                            </td>
                                            <td class="text-center">
                                                <i class="fa-solid fa-circle-info fa-2x text-info"
                                                    data-bs-toggle="modal" data-bs-target="#moTaModal"
                                                    v-on:click="Object.assign(update_bai_viet, value);"></i>
                                            </td>
                                            <td class="align-middle text-center"
                                                style="white-space: normal; word-wrap: break-word;">
                                                {{ formatDateVN(value.created_at) }}
                                            </td>
                                            <td class="text-center">
                                                <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    class="btn btn-success">Hiển Thị</button>
                                                <button v-on:click="changeTrangThai(value)" v-else
                                                    class="btn btn-danger">Ẩn</button>
                                            </td>
                                            <td class="align-middle text-center">
                                                <button
                                                    v-on:click="Object.assign(update_bai_viet, value); is_view_update = 1"
                                                    class="btn btn-primary me-2" data-bs-toggle="modal"
                                                    data-bs-target="#capNhatModal">Cập Nhật</button>
                                                <button v-on:click="Object.assign(delete_bai_viet, value)"
                                                    class="btn btn-danger" data-bs-toggle="modal"
                                                    data-bs-target="#xoaModal">Xóa</button>
                                            </td>
                                        </tr>
                                    </template>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="themmoimodal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6 mb-2">
                                    <label class="form-label">Tên Bài Viết</label>
                                    <input v-on:keyup="createSlug()" v-model="create_bai_viet.ten_bai_viet" type="text"
                                        class="form-control">
                                </div>
                                <div class="col-6 mb-2">
                                    <label class="form-label">Hình Ảnh</label>
                                    <input v-model="create_bai_viet.hinh_anh" type="text" class="form-control">
                                </div>
                                <div class="col-6 mb-2">
                                    <label class="form-label">Mô Tả Ngắn</label>
                                    <input v-model="create_bai_viet.mo_ta_ngan" type="text" class="form-control">
                                </div>

                                <div class="col-6 mb-2">
                                    <label class="form-label">Tình trạng</label>
                                    <select class="form-select" v-model="create_bai_viet.tinh_trang">
                                        <option value="0">Ẩn</option>
                                        <option value="1">Hiển thị</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-2">
                                    <label class="form-label">Mô Tả Chi Tiết</label>
                                    <textarea v-model="create_bai_viet.mo_ta_chi_tiet" class="form-control" cols="30"
                                        rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button v-on:click="createBaiViet()" data-bs-dismiss="modal" type="button"
                                class="btn btn-primary">Xác
                                nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6 mb-2">
                                    <label class="form-label">Tên Bài Viết</label>
                                    <input v-model="update_bai_viet.ten_bai_viet" type="text"
                                        class="form-control">
                                </div>
                                <div class="col-6 mb-2">
                                    <label class="form-label">Hình Ảnh</label>
                                    <input v-model="update_bai_viet.hinh_anh" type="text" class="form-control">
                                </div>
                                <div class="col-6 mb-2">
                                    <label class="form-label">Mô Tả Ngắn</label>
                                    <input v-model="update_bai_viet.mo_ta_ngan" type="text" class="form-control">
                                </div>

                                <div class="col-6 mb-2">
                                    <label class="form-label">Tình trạng</label>
                                    <select class="form-select" v-model="update_bai_viet.tinh_trang">
                                        <option value="0">Ẩn</option>
                                        <option value="1">Hiển thị</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-2">
                                    <label class="form-label">Mô Tả Chi Tiết</label>
                                    <textarea v-model="update_bai_viet.mo_ta_chi_tiet" class="form-control" cols="30"
                                        rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button v-if="is_view_update == 0" disabled data-bs-dismiss="modal" type="button"
                                class="btn btn-danger">Xác Nhận</button>
                            <button v-else v-on:click="accpectUpate()" data-bs-dismiss="modal" type="button"
                                class="btn btn-success">Xác Nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="mb-0 text-dark">Warning</h6>
                                        <div class="text-dark">
                                            <p>Bạn có muốn xóa bài viết <b>{{ delete_bai_viet.ten_bai_viet }}</b> này
                                                không?
                                            </p>
                                            <p>
                                                <b>Lưu ý:</b> Điều này không thể hoàn tác!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button v-on:click="accpectDel()" type="button" class="btn btn-danger"
                                data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="moTaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả Bài Viết
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body justify-content">
                            <h5><b>Mô tả ngắn</b></h5>
                            <p>
                                {{ update_bai_viet.mo_ta_ngan }}
                            </p>
                            <hr>
                            <h5><b>Mô tả chi tiết</b></h5>
                            <p class="justify-content">
                                {{ update_bai_viet.mo_ta_chi_tiet }}
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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
import baseRequest from '../../../core/baseRequest';

export default {
    data() {
        return {
            searchQuery: '',
            sortOrder: 'desc',
            create_bai_viet: {},
            delete_bai_viet: {},
            update_bai_viet: {},
            list_bai_viet: [],
            is_view_update: 0,
        }
    },
    mounted() {
        this.loadData();
    },
    computed: {
        filteredAndSortedBaiViet() {
            let filteredBaiViet = this.list_bai_viet.filter(baiViet => {
                return baiViet.ten_bai_viet.toLowerCase().includes(this.searchQuery.toLowerCase());
            });

            if (this.sortOrder === 'desc') {
                return filteredBaiViet.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else {
                return filteredBaiViet.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
        }
    },

    methods: {
        loadData() {
            baseRequest
                .get('admin/bai-viet/data')
                .then((res) => {
                    this.list_bai_viet = res.data.data
                })
        },
        formatDateVN(dateString) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },

        createBaiViet() {
            baseRequest
                .post('admin/bai-viet/create', this.create_bai_viet,
                )
                .then((res) => {
                    if (res.data.status) {
                        this.create_bai_viet = {}
                        this.loadData();
                    }
                })
        },
        accpectUpate() {
            baseRequest
                .put('admin/bai-viet/update', this.update_bai_viet, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('chia_khoa_16')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                    } else {
                        toaster.error(res.data.message, "Thông báo");
                    }
                });
        },
        accpectDel() {
            baseRequest
                .delete('admin/bai-viet/delete/' + this.delete_bai_viet.id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('chia_khoa_16')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
        },
        changeTrangThai(value) {
            baseRequest
                .put('admin/bai-viet/change-status', value)
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                    } else {
                        toaster.error(res.data.message, "Thông báo");
                    }
                });
        },
    }
}
</script>
<style></style>