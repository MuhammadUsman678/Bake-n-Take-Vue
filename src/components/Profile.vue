<template>
    <div>
        <ul>
            <router-link to="/profile/user-1">User 1</router-link> &nbsp;&nbsp;
            <router-link to="/profile/user-2">User 2</router-link>&nbsp;&nbsp;
            <router-link to="/profile/user-3">User 3</router-link>&nbsp;&nbsp;
            <router-link to="/profile/user-4">User 4</router-link>&nbsp;&nbsp;
        </ul>
        {{ userName }} Profile Page
    </div>
</template>

<script>

export default {
    name: "Profile",
    computed:{
            userName(){
                return this.$route.params.name;
            }
    },
    mounted(){
        
        
    }
}
</script>