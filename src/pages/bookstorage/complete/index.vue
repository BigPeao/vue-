<template>
    <div class="wrapper">
        <div class="content" v-infinite-scroll="load" 
            infinite-scroll-disabled="loading" 
            infinite-scroll-distance="10">
                <!-- <condition-container title="频道：" :seletedValue="queryCondition.channelid" :conditions="conditions.channels" @selectedChanged="channelChanged"></condition-container>
                <condition-container title="分类：" :seletedValue="queryCondition.bookclass" :conditions="conditions.bookclasses" @selectedChanged="bookclassChanged" ></condition-container>
                <condition-container title="小类：" :seletedValue="queryCondition.subclass" :conditions="conditions.subclasses" @selectedChanged="subclassChanged" v-if="conditions.subclasses.length > 0"></condition-container>
                <condition-container title="排序：" :seletedValue="queryCondition.order" :conditions="conditions.orders" @selectedChanged="sortChanged" ></condition-container>
                <condition-container title="状态：" :seletedValue="queryCondition.state" :conditions="conditions.states" @selectedChanged="statesChanged" ></condition-container> -->
                <normal-book :key="index" v-for="(item,index) in filterList" :author="item.author" :intro="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :tclass="item.nclass" :state="item.state"></normal-book>
            </div>
        <ws-footer-line :pager="pager"></ws-footer-line>
    </div>
</template>

<script>
import NormalBook from "@/components/book/normalBook";
import SimpleBook from "@/components/book/simpleBook";
import SpecialOfferBook from "@/components/book/specialOfferBook";
import BookStorageService from "@/domain/bookstorageService";
import WsFooterLine from "@/components/footer/footerline";

export default {
  name: "bookstorage-complete",
  data() {
    return {
      activeIndex: 0,
      recomList: [],
      maleClassList: [],
      femaleClassList: [],
      classResource: [],
      filterList: [],
      pager: {
        pageIndex: 1,
        pageSize: 10,
        records: 0,
        loadFinished: false,
        isloading: false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      },
      conditions: {
        channels: [{ text: "男生", value: 1 }, { text: "女生", value: 2 }],
        bookclasses: [],
        subclasses: [],
        orders: [
          { text: "人气榜", value: 1 },
          { text: "畅销榜", value: 2 },
          { text: "推荐榜", value: 3 },
          { text: "收藏榜", value: 4 },
          { text: "打赏榜", value: 5 }
        ],
        states: [{ text: "连载中", value: 1 }, { text: "已完结", value: 2 }]
      },
      queryCondition: {
        bookclass: 0,
        subclass: 0,
        channelid: 0,
        type: 0,
        order: 1,
        state: 2
      }
    };
  },
  methods: {
    load(reload) {
      if (reload) {
        this.filterList = [];
        this.pager.reset();
      }
      BookStorageService.filter(this.$data).then(data => {
        for (var c in data) {
          this.filterList.push(data[c]);
        }
      });
    },
    /**
     * 初始化分类
     */
    initClasses(){
        BookStorageService.bookClassInit(this).then(data => {
          this.classResource = data.femaleClassList.concat(data.maleClassList);
          this.femaleClassList = data.femaleClassList;
          this.maleClassList = data.maleClassList;
          for (var i in this.classResource) {
            this.conditions.bookclasses.push({
              text: this.classResource[i].title,
              value: this.classResource[i].id
            });
          }
        });
    }
  },
  components: {
    NormalBook,
    SimpleBook,
    SpecialOfferBook,
    BookStorageService,
    WsFooterLine
  },
  created() {
    this.load(true);
    this.initClasses();
  },
  updated() {
    // console.log(this.pager.records)
  }
};
</script>


<style scoped>
.wrapper .content{
    background: #fff;
    padding: 0.875rem  0.875rem 0 0.875rem;
}
</style>


