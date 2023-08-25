<template>
    <el-container style="height: 100%;">
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <common-header></common-header>
            </el-header>
            <div>
              <common-tab></common-tab>
            </div>
            <el-main>
              <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CommonAside from '../components/common/CommonAside'
    import CommonTab from '../components/common/CommonTab'
    import CommonHeader from "./common/CommonHeader";

    export default {
        components: {
            CommonAside,
            CommonHeader,
            CommonTab
        }
    }
</script>

<style lang="scss">
    .el-header {
        background-color: #ffffff;
    }

    .el-main {
        padding-top: 0;
    }
</style>
