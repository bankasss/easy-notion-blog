'use client'
import React, { useState } from 'react';
import axios from 'axios'

type Props = {
  slug: string
}

const LikeButton = (props: Props) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    if (!active) {
      axios.put(`/api/like?slug=${props.slug}`, {})
      setActive(true)
    }
  }

  return (
    <button onClick={handleClick} className={active ? "is-clicked" : ""}>{active ? "いいね済み！" : "いいねする"}</button>
  )
}

export default LikeButton