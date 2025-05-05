<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card border-top border-0 border-4 border-primary shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-header">
                    <h5>Thêm Mới Admin</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Họ và tên</label>
                                <input v-model="create_nhan_vien.ho_va_ten" type="text" class="form-control mt-1">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Số điện thoại</label>
                                <input v-model="create_nhan_vien.so_dien_thoai" type="tel" class="form-control mt-1">
                            </div>
                        </div>
                    </div>
                    <div class="mt-2">
                        <label>Email</label>
                        <input v-model="create_nhan_vien.email" type="text" class="form-control mt-1">
                    </div>
                    <div class="mt-2">
                        <label>Username</label>
                        <input v-model="create_nhan_vien.username" type="text" class="form-control mt-1">
                    </div>
                    <div class="mt-2">
                        <label>Password</label>
                        <input v-model="create_nhan_vien.password" type="tel" class="form-control mt-1">
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Tình Trạng</label>
                                <select name="" id="" class="form-control mt-1" v-model="create_nhan_vien.tinh_trang">
                                    <option v-bind:value="1">Làm Việc</option>
                                    <option v-bind:value="0">Tạm Nghỉ</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Quyền Admin</label>
                                <select name="" id="" class="form-control mt-1" v-model="create_nhan_vien.is_master">
                                    <option v-bind:value="0">Master</option>
                                    <option v-bind:value="1">Kiểm tra Tin Nhắn</option>
                                    <option v-bind:value="2">Đăng Bài Viết và Thông Báo</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-end">
                    <button v-on:click="createNhanVien()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card border-top border-0 border-4 border-primary shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-header">
                    <h5>Danh Sách Tài Khoản</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center align-middle text-nowrap">
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Họ và Tên
                                    </th>
                                    <th>
                                        Quyền Admin
                                    </th>
                                    <th>
                                        Tình Trạng
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in list_nhan_vien">
                                    <tr>
                                        <th class="align-middle text-nowrap text-center">{{ k + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ v.username }}</td>
                                        <td class="align-middle text-nowrap">{{ v.ho_va_ten }}</td>
                                        <td class="align-middle text-nowrap text-center">{{ getRoleText(v.is_master) }}
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="changeTrangThai(v)" v-if="v.tinh_trang == 1"
                                                class="btn btn-success">Làm Việc</button>
                                            <button v-on:click="changeTrangThai(v)" v-else class="btn btn-warning">Tạm
                                                Nghỉ</button>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="Object.assign(update_nhan_vien, v); is_view_update = 1"
                                                class="btn btn-primary me-1" data-bs-toggle="modal"
                                                data-bs-target="#updateModal">Xem Chi Tiết</button>
                                            <button v-on:click="Object.assign(delete_nhan_vien, v)"
                                                class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal">Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                                <!-- Modal Delete -->
                                <div class="modal fade" id="deleteModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Xóa Admin
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
                                                            <h6 class="mb-0 text-dark">Cảnh báo xóa vĩnh viễn</h6>
                                                            <div class="text-dark">
                                                                Bạn có chắc chắn muốn xóa Admin <b>{{
                                                                    delete_nhan_vien.ho_va_ten }}</b> này không?
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button v-on:click="accpectDel()" data-bs-dismiss="modal" type="button"
                                                    class="btn btn-danger">Xác
                                                    Nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal Update -->
                                <div class="modal fade" id="updateModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Chi Tiết Tài Khoản
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <h9>Họ và tên</h9>
                                                                <input v-model="update_nhan_vien.ho_va_ten" type="text"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Số điện thoại</label>
                                                                <input v-model="update_nhan_vien.so_dien_thoai"
                                                                    type="tel" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Email</label>
                                                                <input v-model="update_nhan_vien.email" type="text"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Username</label>
                                                                <input v-model="update_nhan_vien.username" type="text"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Tình Trạng</label>
                                                                <select name="" id="" class="form-control mt-1"
                                                                    v-model="update_nhan_vien.tinh_trang">
                                                                    <option v-bind:value="1">Làm Việc</option>
                                                                    <option v-bind:value="0">Tạm Nghỉ</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Quyền Admin</label>
                                                                <select name="" id="" class="form-control mt-1"
                                                                    v-model="update_nhan_vien.is_master">
                                                                    <option v-bind:value="0">Master</option>
                                                                    <option v-bind:value="1">Kiểm Tra Tin Nhắn</option>
                                                                    <option v-bind:value="2">Đăng Bài Viết và Thông Báo</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button v-if="is_view_update == 0" disabled data-bs-dismiss="modal"
                                                    type="button" class="btn btn-danger">Xác Nhận</button>
                                                <button v-else v-on:click="accpectUpate()" data-bs-dismiss="modal"
                                                    type="button" class="btn btn-success">Xác Nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from 'axios';
import baseRequest from "../../../core/baseRequest";
export default {
    data() {
        return {
            list_nhan_vien: [],
            create_nhan_vien: {},
            delete_nhan_vien: {},
            update_nhan_vien: {},
            is_view_update: 0,
        }
    },
    mounted() {
        this.loadNhanVien();
    },
    methods: {
        getRoleText(is_master) {
            if (is_master === 0) return 'Master';
            if (is_master === 1) return 'Kiểm Tra Tin Nhắn';
            if (is_master === 2) return 'Đăng Bài Viết và Thông Báo';
            return 'Không xác định'; // Trường hợp không hợp lệ
        },
        loadNhanVien() {
            baseRequest
                .get('admin/nhan-vien/data')
                .then((res) => {
                    this.list_nhan_vien = res.data.data;
                });
        },
        createNhanVien() {
            baseRequest
                .post('admin/nhan-vien/create', this.create_nhan_vien)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadNhanVien();
                        this.create_nhan_vien = {};
                    }
                });
        },
        accpectDel() {
            baseRequest
                .delete('admin/nhan-vien/delete/' + this.delete_nhan_vien.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadNhanVien();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        accpectUpate() {
            baseRequest
                .put('admin/nhan-vien/update', this.update_nhan_vien)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadNhanVien();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        changeTrangThai(value) {
            baseRequest
                .put('admin/nhan-vien/change-status', value)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadNhanVien();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
    },
}
</script>
<style></style>