<template>
  <div>
    
    <div class="container">
      
      <div class="row">
        <div class="col s12 m8 l8">
          <MainCard/>
        </div>

        <div class="col s12 m4 l4">
          <SideCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MainCard from '@/components/MainCard'
    import SideCard from '@/components/SideCard'
    

    export default{
        components: {
            MainCard,
            SideCard
            
        }
    }

</script>

