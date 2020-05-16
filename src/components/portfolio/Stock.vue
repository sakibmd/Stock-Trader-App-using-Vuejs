<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" placeholder="Quantity" class="form-control" v-model="quantity"
                    :class="{danger: insufficientQuantity}">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success"
                     :disabled="insufficientQuantity || +quantity <= 0 || !Number.isInteger(+quantity)"
                      @click="sellStock">{{ insufficientQuantity ? 'Not Enough' : 'Sell' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .danger{
        border: 3px solid darkorange;
    }
</style>>


<script>
import { mapActions } from 'vuex';
export default {
    props: ['stock'],
    data(){
        return{
            quantity: 0,
        };
    },
    computed: {
        insufficientQuantity(){
            return this.quantity > this.stock.quantity;
        },
    },
    methods: {
        ...mapActions({
            placeSellOrder: 'sellStock',  //from portfolio module
        }),
        sellStock(){
            const order = {
                stockId: this.stock.id,
                quantity: this.quantity,
                stockPrice: this.stock.price
            };
            this.placeSellOrder(order);
            this.quantity = 0;

        }
    }

}
</script>>