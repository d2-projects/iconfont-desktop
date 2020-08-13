import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['loading', 'loading', false],
  ['id', 'id', 0],
  ['name', 'name', ''],
  ['icons', 'icons', []],
  ['countIcons', 'icons_count', 0],
  ['countVisits', 'visits_count', 0],
  ['countLikes', 'likes_count', 0],
  ['countFavorite', 'favorite_count', 0],
  ['timeUpdate', 'updated_at', ''],
  ['user', 'User', {}]
]

export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    illustration: {
      type: Boolean
    }
  },
  computed: {
    ...fromPairs(
      dataMap.map(e => [
        e[0],
        function () {
          return get(this.value, e[1], e[2])
        }
      ])
    )
  }
}
