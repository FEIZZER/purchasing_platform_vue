/*
 * @Author: feizzer
 * @Date: 2021-12-13 16:13:42
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 21:24:05
 * @Description: 
 */
export const superMenus = [
    {
        name: '人员管理',
        childrens: [
            {name: '管理员', route: '/manageadmins'}
        ]
    },
    {
        name: '组织管理',
        childrens: [
            {name: '组织管理', route: '/manageorganization'}
        ]
    },
    {
        name: '角色管理',
        childrens: [
            {name: '角色管理',}
        ]
    }
]

export const adminMenus = [
    {
        name: '人员管理',
        childrens: [
            {name: '采购员管理', route: '/purchase'},
            {name: '供应商管理', route: '/supplier'}
        ]
    },
    {
        name: '标案管理',
        childrens: [
            {name: '标案审核', route: '/auditproject'},
            {name: '标案管理', route: '/manageproject'}
        ]
    },
    {
        name: '基础资料',
        childrens: [
            {name: '产品管理', route: '/manageproduct'},
            {name: '类型管理', route: '/managetype'},
            {name: '项目管理'},
        ]
    },
]

export const purchaseMenus = [
    {
        name: '审核管理',
        childrens: [
            {name: '投标审核', route: 'auditapply'},
            {name: '资质审核', route: 'auditauthor'}
        ]
    },
    {
        name: '投标管理',
        childrens: [
            {name: '未通过标案',  route: '/projectauditing'},
            {name: '已通过标案',  route: '/projectaudited'},
            {name: '定标管理', route: '/projectdown'},
        ]
    },
    {
        name:'我的账户',
        childrens: [
            {name: '消息中心'},
            {name: '账户信息'}
        ]
    }
]

export const supplierMenus = [
    {
        name: '申请管理',
        childrens: [
            {name: '资质申请'},
            {name: '我的资质'},
            {name: '投标申请'},
            {name: '预约管理'},
            {name: '竞标管理'}
        ]
    },
    {
        name:'我的账户',
        childrens: [
            {name: '消息中心'},
            {name: '账户信息'}
        ]
    }
]