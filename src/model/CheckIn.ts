import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class CheckIn extends Model {
  static table = 'check_in'
  static associations = {
    user: { type: 'belongs_to', key: 'user_id' },
  }

  @field('status') status: any
  @field('created_at') createdAt: any
  @field('updated_at') updatedAt: any
  @relation('user', 'user_id') user: any
}
