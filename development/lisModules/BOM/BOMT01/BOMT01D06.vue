<template>
  <l-table
    v-model="dv.lisbomdocs.operations"
    :columns="operationsColumns"
    :height="'73vh'"
    width="100%"
    @zoom="fetchZoom($event)"
    @keydown="if ($event.key == 'Insert') this.pushNewOpr($event);"
  />

  <l-dialog v-model="isShowWc" persistent>
    <l-card0>
      <BOMT02D01
        :dv="dv"
        :tabInfo="tabInfo"
        :isChild="true"
        @cancel="isShowWc = false"
        @ok="
          dv.lisbomdocs.operations[this.zoomWc].workcenter = $event.workcenter;
          isShowWc = false;
        "
      />
    </l-card0>
  </l-dialog>
  <!-- <l-dialog v-model="isShowCc" persistent>
    <l-card0>
      <COST01D01
        :dv="dv"
        :tabInfo="tabInfo"
        :isChild="true"
        @cancel="isShowWc = false"
        @ok="
          dv.lisbomdocs.operations[this.zoomWc].costcenter = $event.costcenter;
          isShowWc = false;
        "
      />
    </l-card0>
  </l-dialog> -->
</template>

<script>
import BOMT02D01 from "../../BOM/BOMT02/BOMT02D01.vue";
//import COST01D01 from "../../COS/COST01/COST01D01.vue";

export default {
  props: ["dv", "tabInfo"],
  components: { BOMT02D01 },
  data() {
    return {
      isShowWc: false,
      isShowCc: false,
      zoomWc: null,
      operationsColumns: [
        {
          type: "number",
          value: "operation",
          label: this.$gl("Operasyon No", "Operation No"),
        },
        {
          type: "selectmenu",
          label: this.$gl("Operasyon Kontrol Tipi", "Operation Control Type"),
          value: "oprcontrol",
          options: "lisbom005",
          optValue: "oprcontrol",
          optTitles: {
            oprcontrol: "Operasyon Kontrol Tipi",
            stext: "Açıklama",
          },
        },
        {
          type: "zoom",
          value: "workcenter",
          label: this.$gl("İş Merkezi", "Work Center"),
        },
        {
          type: "zoom",
          value: "costcenter",
          label: this.$gl("Maliyet Merkezi", "Cost Center"),
        },
        {
          type: "string",
          value: "capgrp",
          label: this.$gl(
            "İş Merkezi Kapasite Grubu",
            "Work Center Capacity Group"
          ),
        },
        //  {
        //      type: "zoom",
        //      value: "material",
        //      label: this.$gl("Malzeme", "Material"),
        //  },

        //  {
        //      type: "number",
        //      value: "quantity",
        //      fraction: 2,
        //      label: this.$gl("Miktar", "Quantity"),
        //  },

        //  {
        //      type: "selectmenu",
        //      label: this.$gl("Miktar Br.", "Quantity Unit"),
        //      value: "qunit",
        //      options: "lisbas007",
        //      optValue: "unit",
        //      optTitles: { unit: "Birim", stext: "Açıklama" },
        //      optFilter: { unittype: 0 },
        //  },
        //  {
        //      type: "selectmenu",
        //      label: this.$gl("Depo", "Warehouse"),
        //      value: "warehouse",
        //      options: "lisinv003",
        //      optValue: "warehouse",
        //      optTitles: { warehouse: "Depo", stext: "Açıklama" },
        //      optFilter: {
        //          company: this.dv.lisbomdocs.company,
        //          plant: this.dv.lisbomdocs.plant,
        //      },
        //  },
        //  {
        //      type: "selectmenu",
        //      label: this.$gl("Stok Yeri", "Stock Place"),
        //      value: "stockplace",
        //      options: "lisinv004",
        //      optValue: "stockplace",
        //      optTitles: { stockplace: "Stok Yeri", stext: "Açıklama" },
        //      optFilter: {
        //          company: this.dv.lisbomdocs.company,
        //          plant: this.dv.lisbomdocs.plant,
        //      },
        //  },
        {
          type: "string",
          value: "stext",
          label: this.$gl("Açıklama", "Description"),
        },
      ],
    };
  },
  methods: {
    fetchZoom(event) {
      console.log(event);
      if (event.value == "workcenter") {
        this.zoomWc = event.row;
        this.isShowWc = true;
      }
      if (event.value == "costcenter") {
        this.zoomWc = event.row;
        this.isShowCc = true;
      }
    },
    async pushNewOpr(event) {
      console.log("pushNewOpr", event);
      let myReturn = await this.lis.function("BOMT01/pushNewOpr", this.dv);
      myReturn.operation =
        this.dv.lisbomdocs.operations[this.dv.lisbomdocs.operations.length - 1]
          .operation + 10;
      this.dv.lisbomdocs.operations.push(myReturn);
    },
  },
};
</script>

function data() { new Error('Function not implemented.'); }
