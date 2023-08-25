export default {

    //存储数据
    state: {
        isCollapse: false,
        currentMenu: [
          {
            path: 'welcome',
            authName: '首页',
            icon: 's-home',
          }
        ],
        tabsList: [
            {
                path: 'welcome',
                authName: '首页',
                icon: 's-home',
            }
        ],
        resetTabsList: [
        {
          path: 'welcome',
          authName: '首页',
          icon: 's-home',
        }
      ]
    },
    //调用方法
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //选择标签
        selectMenu(state, val) {
            if (val.path === 'welcome') {
                state.currentMenu = state.resetTabsList
            } else {
                state.currentMenu = val
                //如果等于-1说明tabsList不存在那么插入，否则什么都不做
                let result = state.tabsList.findIndex(item => item.path === val.path)
                result === -1 ? state.tabsList.push(val) : ''

            }
        },
        //关闭标签
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.path === val.path)
            state.tabsList.splice(result, 1)
        },
        //重置vuex
        resetTab(state){
          state.currentMenu=[
            {
              path: 'welcome',
              authName: '首页',
              icon: 's-home',
            }
          ]
          state.tabsList=[
            {
              path: 'welcome',
              authName: '首页',
              icon: 's-home',
            }
          ]
        },
      //添加一级菜单
      // insertMenu(state, val){
      //     for (i in val){
      //       state.firstMenu.push({path: val.path,authName: val.authName})
      //     }
      // }
    },
    actions: {}
}
