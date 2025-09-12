import { useState, FormEvent, useEffect } from 'react';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	initialSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние для хранения текущих настроек формы
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(initialSettings);

	// Синхронизация с внешними настройками при их изменении
	useEffect(() => {
		setFormSettings(initialSettings);
	}, [initialSettings]);

	// Обработчики изменения настроек
	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormSettings({
			...formSettings,
			fontFamilyOption: option,
		});
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormSettings({
			...formSettings,
			fontSizeOption: option,
		});
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormSettings({
			...formSettings,
			fontColor: option,
		});
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormSettings({
			...formSettings,
			backgroundColor: option,
		});
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormSettings({
			...formSettings,
			contentWidth: option,
		});
	};

	// Обработчик отправки формы
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply(formSettings);
	};

	// Обработчик сброса формы
	const handleReset = () => {
		// Сначала сбрасываем к дефолтным настройкам локально
		setFormSettings({ ...defaultArticleState });

		// Затем сообщаем родителю о сбросе и применяем дефолтные настройки
		onReset();
		onApply({ ...defaultArticleState });
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Text size={31} weight={800} uppercase>
				Задайте параметры
			</Text>

			<Select
				title='Шрифт'
				options={fontFamilyOptions}
				selected={formSettings.fontFamilyOption}
				onChange={handleFontFamilyChange}
			/>

			<RadioGroup
				title='Размер шрифта'
				name='fontSize'
				options={fontSizeOptions}
				selected={formSettings.fontSizeOption}
				onChange={handleFontSizeChange}
			/>

			<Select
				title='Цвет шрифта'
				options={fontColors}
				selected={formSettings.fontColor}
				onChange={handleFontColorChange}
			/>

			<Separator />

			<Select
				title='Цвет фона'
				options={backgroundColors}
				selected={formSettings.backgroundColor}
				onChange={handleBackgroundColorChange}
			/>

			<Select
				title='Ширина контента'
				options={contentWidthArr}
				selected={formSettings.contentWidth}
				onChange={handleContentWidthChange}
			/>

			<div className={styles.bottomContainer}>
				<Button title='Сбросить' type='clear' onClick={handleReset} />
				<Button title='Применить' type='apply' htmlType='submit' />
			</div>
		</form>
	);
};
