/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo, type ReactNode } from 'react'
import clsx from 'clsx'
import EditThisPage from '@theme/EditThisPage'
import type { Props } from '@theme/EditMetaRow'

import LastUpdated from '@theme/LastUpdated'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import styles from './styles.module.css'

export default function EditMetaRow({
  className,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
}: Props): ReactNode {
  const { frontMatter } = useDoc()

  const canDisplayLastUpdated = useMemo(() => {
    // @ts-expect-error
    if (frontMatter?.show_last_update === false) {
      return false
    }
    return lastUpdatedAt || lastUpdatedBy
    // @ts-expect-error
  }, [frontMatter?.show_last_update, lastUpdatedAt, lastUpdatedBy])

  return (
    <div className={clsx('row', className)}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      <div className={clsx('col', styles.lastUpdated)}>
        {canDisplayLastUpdated && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  )
}
