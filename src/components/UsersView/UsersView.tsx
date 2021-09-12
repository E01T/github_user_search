import React from 'react'
import { user_type } from '../../types/user_types'

function PageView({
  users,
  children,
}: {
  users: user_type[]
  children: React.ReactNode
}) {
  const usersProfiles = users.map((user: user_type) => {
    return (
      <div
        data-testid="card"
        className="card"
        style={{ maxWidth: '600px' }}
        key={user.id}
      >
        <div className="row">
          <div className="col-md-4 ">
            <img
              className="img-fluid rounded-start"
              style={{ width: '80px' }}
              src={user.avatar_url}
              alt="user avatar"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  {user.login}
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={user.html_url} rel="noreferrer" target="_blank">
                  {user.name}
                </a>
              </h5>
              <p className="card-text">{user.bio}</p>
              <p className="card-text">
                <span>{user.followers} followers</span>{' '}
                <span>Following: {user.following}</span>
              </p>
              {user.location ? (
                <p className="card-text"> Location: {user.location}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <>
      {usersProfiles}
      {children}
    </>
  )
}

function arraysIdentical(
  prevProps: Readonly<{ users: user_type[]; children: React.ReactNode }>,
  currentProps: Readonly<{ users: user_type[]; children: React.ReactNode }>
) {
  const a = prevProps.users
  const b = currentProps.users

  let i = a.length
  if (i !== b.length) return false
  while (i--) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const MemoizedPageView = React.memo(PageView, arraysIdentical)
