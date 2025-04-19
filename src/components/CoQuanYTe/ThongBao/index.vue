<template>
    <div class="card  shadow-lg p-3 mb-5 bg-body rounded">
        <div class="card-header mt-2 p-3 bg-light rounded">
            <div class="row align-items-center">
                <div class="col-lg-3 col-md-12 mb-2 mb-lg-0">
                    <h5 class="mb-0"><b>Danh Sách Thông Tin & Thông Báo</b></h5>
                </div>
                <div class="col-lg-5 col-md-8 col-12 mb-2 mb-lg-0">
                    <div class="search-bar w-100">
                        <div class="position-relative">
                            <input v-model="searchQuery" type="text" class="form-control search-control"
                                placeholder="Tìm kiếm thông báo...">
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
                    <button class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#themmoimodal">
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
                            <th>Tiêu Đề</th>
                            <th>Hình Ảnh</th>
                            <th>Nội Dung</th>
                            <th>Ngày Tạo</th>
                            <th>Người Thêm</th>
                            <th>Chức Vụ</th>
                            <th>Tình Trạng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, key) in filteredAndSortedThongBao">
                            <tr class="align-middle">
                                <th class="align-middle text-center">{{ key + 1 }}</th>
                                <td class="align-middle" style="white-space: normal; word-wrap: break-word;">{{
                                    value.tieu_de }}
                                </td>
                                <td class="align-middle text-center">
                                    <img v-bind:src="value.hinh_anh" class="img-fluid"
                                        style="height: 100px; width: 100%;" alt="">
                                </td>
                                <td class="align-middle" style="white-space: normal; word-wrap: break-word;">{{
                                    value.noi_dung }}
                                </td>
                                <td class="align-middle text-center"
                                    style="white-space: normal; word-wrap: break-word;">
                                    {{ formatDateVN(value.created_at) }}
                                </td>
                                <td class="align-middle" style="white-space: normal; word-wrap: break-word;">{{
                                    value.ho_va_ten }}
                                </td>
                                <td class="align-middle" style="white-space: normal; word-wrap: break-word;">{{
                                    value.chuc_vu }}
                                </td>
                                <td class="text-center">
                                    <button v-if="value.tinh_trang == 1"
                                        class="btn btn-success">Gửi Tới Người Dùng</button>
                                    <button v-else class="btn btn-danger">Chờ Duyệt</button>
                                </td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal fade" id="themmoimodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Thông Báo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <label class="form-label">Tiêu Đề</label>
                        <input v-model="create_thong_bao.tieu_de" type="text" class="form-control mb-2">
                        <label class="form-label">Hình Ảnh</label>
                        <input v-model="create_thong_bao.hinh_anh" type="text" class="form-control mb-2">
                        <label class="form-label">Nội Dung</label>
                        <input v-model="create_thong_bao.noi_dung" type="text-area" class="form-control text-area">

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
            create_thong_bao: {},
            delete_thong_bao: {},
            update_thong_bao: {},
            list_thong_bao: [],
        }
    },
    mounted() {
        this.loadData();
    },
    computed: {
        filteredAndSortedThongBao() {
            let filteredBaiViet = this.list_thong_bao.filter(baiViet => {
                return baiViet.tieu_de.toLowerCase().includes(this.searchQuery.toLowerCase());
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
                .get('admin/thong-bao/data')
                .then((res) => {
                    this.list_thong_bao = res.data.data
                })
        },
        formatDateVN(dateString) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        createBaiViet() {
            baseRequest
                .post('co-quan/thong-bao/create', this.create_thong_bao,
                )
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.create_thong_bao = {};
                        this.loadData();
                    }
                })
        },
    }
}
</script>
<style></style>