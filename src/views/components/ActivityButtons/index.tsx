import React, { useCallback, useState, useEffect } from 'react'
import { Q } from '@nozbe/watermelondb'
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import numberDateTime from '../../../utils/numberDateTime'
import Button from './Button'
import Container from './Container'

const Activity = { Container, Button }

const ActivityButtons = ({ user, checkIn, checkOut }) => {
  const [disabled, setDisabled] = useState([false, true])

  const createCheckIn = useCallback(async () => {
    await user[0].createCheckIn()
  }, [user])

  const createCheckOut = useCallback(async () => {
    await user[0].createCheckOut()
  }, [user])

  useEffect(() => {
    if (checkIn.length > 0) {
      setDisabled([true, false])
    } else {
      setDisabled([false, true])
    }
    if (checkOut.length > 0) {
      setDisabled([true, true])
    }
  }, [checkIn, checkOut])

  return (
    <Activity.Container>
      <Activity.Button
        disabled={disabled[0]}
        title="Check-in"
        onPress={() => createCheckIn()}
      />
      <Activity.Button
        disabled={disabled[1]}
        title="Check-out"
        onPress={() => createCheckOut()}
      />
    </Activity.Container>
  )
}

const enhance = withObservables(
  ['user', 'check_in', 'check_out'],
  ({ database }: any) => {
    const { today, tomorrow } = numberDateTime
    return {
      user: database.collections.get('user').query().observe(),
      checkIn: database.collections
        .get('check_in')
        .query(Q.where('created_at', Q.between(today, tomorrow))),
      checkOut: database.collections
        .get('check_out')
        .query(Q.where('created_at', Q.between(today, tomorrow))),
    }
  },
)

export default withDatabase(enhance(ActivityButtons))
