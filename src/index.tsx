import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { ArrowButton } from './ui/arrow-button';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import formStyles from './components/article-params-form/ArticleParamsForm.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для хранения настроек статьи
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние для открытия/закрытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Рефы для отслеживания кликов вне сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	// Обработчик переключения сайдбара
	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Обработчик применения настроек
	const handleApplySettings = (newSettings: ArticleStateType) => {
		setArticleSettings(newSettings);
	};

	// Обработчик сброса настроек
	const handleResetSettings = () => {
		// Явно устанавливаем значения по умолчанию
		setArticleSettings({ ...defaultArticleState });
	};

	// Закрытие сайдбара при клике вне его области
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<div ref={buttonRef} className={styles.buttonContainer}>
				<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			</div>

			<div
				ref={sidebarRef}
				className={clsx(formStyles.container, {
					[formStyles.container_open]: isSidebarOpen,
				})}>
				<ArticleParamsForm
					initialSettings={articleSettings}
					onApply={handleApplySettings}
					onReset={handleResetSettings}
				/>
			</div>

			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
