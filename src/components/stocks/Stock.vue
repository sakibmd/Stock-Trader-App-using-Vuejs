<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" placeholder="Quantity" class="form-control" 
                    v-model="quantity"
                    :class="{danger: inSufficientFunds}">
                </div>
                <div class="pull-right">
                    <button
                     class="btn btn-success"
                     @click="buyStock"
                      :disabled="inSufficientFunds || +quantity <= 0 || !Number.isInteger(+quantity)"
                       >{{ inSufficientFunds ? 'Insufficient Fund' : 'Buy' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>>

<style scoped>
    .danger{
        border: 3px solid darkorange;
    }
</style>>


<script>
export default {
    props: ['stock'],
    data(){
        return{
            quantity: 0,
        };
    },
    computed:{
        funds(){
            return this.$store.getters.funds;
        },
        inSufficientFunds(){
            return this.quantity * this.stock.price > this.funds;
        }
    },
    methods: {
        buyStock(){
            const order = {
                stockId: this.stock.id,
                quantity: +this.quantity,
                stockPrice: this.stock.price
            };
            this.$store.dispatch('buyStock', order);
            this.quantity = 0;
        
        }
    }

}
</script>>