<template>
       <v-card
          class="mx-auto mb-5 pa-1"
          color=""
          dark
        >
      <v-card-title>
        <v-icon
          large
          left
        >mdi-comment</v-icon>
        <span class="text-h6 font-weight-light">{{ comment.created_at | dateString }}</span>
      </v-card-title>
  
      <v-card-text class="text-p font-weight-bold">
        {{ comment.comment_content }}
      </v-card-text>
  
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>{{ comment.author.username }}</v-list-item-title>
          </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">
              mdi-heart
            </v-icon>
            <span class="subheading mr-2">256</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>    
</template>

<script>
export default {
    props: {
        comment: {
            required: true,
            type: Object
        }
    },
    filters: {
        dateString: function (date) {
        const dateString = new Date(date)
        return dateString.toLocaleDateString('pl-PL')
        }
  },
}
</script>
