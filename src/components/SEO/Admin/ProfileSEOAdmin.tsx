'use client'

import { memo, useEffect, useState } from 'react'

import s from './ProfileSEOAdmin.module.scss'

import ButtonedInput from '@/shared/ui/Fields/ButtonedInput/ButtonedInput'
import DropDown from '@/shared/ui/Fields/DropDown/DropDown'
import { Typography } from '@/shared/ui/Typography'
import ConfirmBanModal from '../../pages/ProfileUsers/components/ConfirmBanModal'
import { useSEOPage } from '../hooks/useSeoPage'

import { TPage } from '@/features/head/model/types'
import { ProfilePageCard } from '../components/ProfilePageCard/ProfilePageCard'

export const ProfileSEOAdminPage = memo(function ProfileSEOAdminPage() {
    const [prevFilteredPages, setPrevFilteredPages] = useState<TPage[]>([])

    const {
        inputValue,
        setInputValue,
        handleSearch,
        filterValue,
        setFilterValue,
        filterOptions,
        isPagesLoading,
        filteredPages,
        handleDeletePage,
        handleUpdatePage
    } = useSEOPage()

    useEffect(() => {
        if (inputValue === '') {
            handleSearch()
        }

        if (filteredPages.length > 0) {
            setPrevFilteredPages(filteredPages)
        }
    }, [filteredPages, handleSearch, inputValue])

    console.log(filteredPages)

    return (
        <div className={s.page}>
            <div className={s.content}>
                <Typography className={s.subtitle}>Страница управления SEO-материалами</Typography>

                <div className={s.inputBlock}>
                    <ButtonedInput
                        isButtonDisabled={false}
                        label='Найти страницу'
                        placeholder='Введите название страницы'
                        button='Найти'
                        value={inputValue}
                        setValue={setInputValue}
                        onClick={handleSearch}
                    />
                </div>

                {filteredPages && filteredPages.length <= 0 ? (
                    <div className={s.notFound}>Страница не найдена</div>
                ) : null}

                <div className={s.body}>
                    <DropDown
                        value={filterValue}
                        onChange={({ value }) => {
                            setFilterValue(value as string)
                        }}
                        classes={{ root: s.filter }}
                        variant='small'
                        options={filterOptions}
                    />

                    {isPagesLoading && <div>Загрузка...</div>}

                    <div className={s.cards}>
                        {filteredPages && filteredPages.length > 0 ? (
                            filteredPages.map(page => (
                                <ProfilePageCard
                                    key={page.id}
                                    data={page}
                                    onDelete={handleDeletePage}
                                    onSubmit={handleUpdatePage}
                                />
                            ))
                        ) : (
                            <>
                                {prevFilteredPages &&
                                    prevFilteredPages.map((prevPage: TPage) => (
                                        <ProfilePageCard
                                            key={prevPage.id}
                                            data={prevPage}
                                            onDelete={handleDeletePage}
                                            onSubmit={handleUpdatePage}
                                        />
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
})
