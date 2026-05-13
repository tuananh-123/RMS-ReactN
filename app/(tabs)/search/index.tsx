import ThemedText from '@/components/Theme-text';
import { apiClient } from '@/hooks/useAPI';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';


interface Recipe {
	id: number;
	title: string;
	category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack';
	difficulty: 'Easy' | 'Medium' | 'Hard';
	cookingTime: number; // minutes	
	description: string;
	ingredients: string[];
	imageUrl: string;
	rating: number;
	serving: number;
	nation: string;
	imageCover: string;
}

type getRecipeProps = {
	page: number,
	pageSize: number,
	sortBy: string | '_',
	filter: {
		Categories: number[] | [],
		Ingredients: number[] | [],
		CookingTime: number | null,
		Difficulty: number | null,
		Keyword: string | null
	}
}

// Mock data - 15 sample recipes
const mockRecipes: Recipe[] = [
	{
		id: 1,
		title: 'Avocado Toast',
		category: 'Breakfast',
		difficulty: 'Easy',
		cookingTime: 10,
		description: 'Creamy avocado on toasted bread with eggs.',
		ingredients: ['Avocado', 'Bread', 'Eggs', 'Salt'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 2,
		title: 'Chicken Caesar Salad',
		category: 'Lunch',
		difficulty: 'Easy',
		cookingTime: 20,
		description: 'Fresh salad with grilled chicken and Caesar dressing.',
		ingredients: ['Chicken', 'Lettuce', 'Croutons', 'Caesar dressing'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 3,
		title: 'Beef Stir Fry',
		category: 'Dinner',
		difficulty: 'Medium',
		cookingTime: 25,
		description: 'Quick stir fry with vegetables and tender beef.',
		ingredients: ['Beef', 'Broccoli', 'Carrots', 'Soy sauce'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 4,
		title: 'Chocolate Chip Cookies',
		category: 'Dessert',
		difficulty: 'Easy',
		cookingTime: 30,
		description: 'Classic homemade cookies with chocolate chips.',
		ingredients: ['Flour', 'Butter', 'Chocolate chips', 'Sugar'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 5,
		title: 'Greek Yogurt Parfait',
		category: 'Snack',
		difficulty: 'Easy',
		cookingTime: 5,
		description: 'Layered yogurt with fruits and granola.',
		ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 6,
		title: 'Pancakes with Maple Syrup',
		category: 'Breakfast',
		difficulty: 'Easy',
		cookingTime: 15,
		description: 'Fluffy pancakes served with maple syrup.',
		ingredients: ['Flour', 'Milk', 'Eggs', 'Maple syrup'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 7,
		title: 'Quinoa Buddha Bowl',
		category: 'Lunch',
		difficulty: 'Medium',
		cookingTime: 35,
		description: 'Nutritious bowl with quinoa and roasted veggies.',
		ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Tahini'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 8,
		title: 'Grilled Salmon',
		category: 'Dinner',
		difficulty: 'Medium',
		cookingTime: 20,
		description: 'Perfectly grilled salmon with lemon and herbs.',
		ingredients: ['Salmon', 'Lemon', 'Herbs', 'Olive oil'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 9,
		title: 'Tiramisu',
		category: 'Dessert',
		difficulty: 'Hard',
		cookingTime: 60,
		description: 'Classic Italian dessert with coffee and mascarpone.',
		ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 10,
		title: 'Trail Mix',
		category: 'Snack',
		difficulty: 'Easy',
		cookingTime: 5,
		description: 'Mix of nuts, dried fruits, and chocolate.',
		ingredients: ['Nuts', 'Dried fruits', 'Chocolate', 'Seeds'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 11,
		title: 'Omelette with Vegetables',
		category: 'Breakfast',
		difficulty: 'Easy',
		cookingTime: 12,
		description: 'Fluffy omelette filled with fresh vegetables.',
		ingredients: ['Eggs', 'Bell peppers', 'Onions', 'Cheese'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 12,
		title: 'Caprese Salad',
		category: 'Lunch',
		difficulty: 'Easy',
		cookingTime: 10,
		description: 'Simple Italian salad with tomatoes and mozzarella.',
		ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Balsamic vinegar'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 13,
		title: 'Spaghetti Carbonara',
		category: 'Dinner',
		difficulty: 'Medium',
		cookingTime: 25,
		description: 'Creamy pasta with bacon and Parmesan.',
		ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 14,
		title: 'Fruit Sorbet',
		category: 'Dessert',
		difficulty: 'Easy',
		cookingTime: 10,
		description: 'Refreshing frozen fruit dessert.',
		ingredients: ['Mixed berries', 'Sugar', 'Lemon juice'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
	{
		id: 15,
		title: 'Veggie Sticks with Hummus',
		category: 'Snack',
		difficulty: 'Easy',
		cookingTime: 5,
		description: 'Healthy snack with fresh vegetables and dip.',
		ingredients: ['Carrots', 'Celery', 'Cucumber', 'Hummus'],
		imageUrl: 'https://placehold.co/400x300',
		rating: 0,
		serving: 0,
		nation: '',
		imageCover: ''
	},
];

export default function RecipeSearchScreen() {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
	const [selectedMaxTime, setSelectedMaxTime] = useState<number | null>(null);

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(15);

	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);


	const [sortBy, setSortBy] = useState<string>('_');

	const [total, setTotal] = useState<number>(0);
	const [totalPage, setTotalPage] = useState<number>(0);
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

	// Debounce search term
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 350);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		const fetchData = async (endpoint: string) => {
			try {
				const res = await apiClient.get(endpoint);
				const list = res.data.items.map((item: any) => item as Recipe);
				setFilteredRecipes(list);

				const totalCount = res.data.totalCount as number;
				setTotal(totalCount);

				const totalPage = res.data.totalPages as number;
				setTotalPage(totalPage);
				// Optionally, set state with fetched data if you want to use it instead of mock
			} catch (error) {
				console.error('Failed to fetch recipes:', error);
			}
		};

		const params = new URLSearchParams();

		selectedCategories.forEach(id => params.append("Categories", id.toString()));
		selectedIngredients.forEach(id => params.append("Ingredients", id.toString()));
		
		if (selectedMaxTime != null) params.append("CookingTime", selectedMaxTime.toString())
		if (selectedDifficulty != null) params.append("Difficulty", selectedDifficulty.toString());
		if (debouncedSearchTerm) params.append("Keyword", debouncedSearchTerm);

		const base = `api/recipe/get/list/${page}/${pageSize}/${sortBy}?${params}`;
		fetchData(base);
	}, [page, pageSize, sortBy]);

	// Active filters for display
	// const activeFilters = useMemo(() => {
	// 	const filters: string[] = [];
	// 	if (selectedCategory !== 'All') filters.push(selectedCategory);
	// 	if (selectedDifficulty !== 'All') filters.push(selectedDifficulty);
	// 	if (selectedMaxTime) filters.push(`${selectedMaxTime} min`);
	// 	return filters;
	// }, [selectedCategory, selectedDifficulty, selectedMaxTime]);

	

	// Filtered recipes
	// const filteredRecipes = useMemo(() => {
	// 	return mockRecipes.filter(recipe => {
	// 		// Search filter
	// 		const matchesSearch = debouncedSearchTerm === '' ||
	// 			recipe.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
	// 			recipe.ingredients.some(ing => ing.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

	// 		// Category filter
	// 		const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;

	// 		// Difficulty filter
	// 		const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;

	// 		// Time filter
	// 		const matchesTime = !selectedMaxTime || recipe.cookingTime <= selectedMaxTime;

	// 		return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
	// 	});
	// }, [debouncedSearchTerm, selectedCategory, selectedDifficulty, selectedMaxTime]);

	// const clearAllFilters = useCallback(() => {
	// 	setSelectedCategory('All');
	// 	setSelectedDifficulty('All');
	// 	setSelectedMaxTime(null);
	// 	setSearchTerm('');
	// }, []);

	// const removeFilter = useCallback((filter: string) => {
	// 	if (filter === selectedCategory) setSelectedCategory('All');
	// 	else if (filter === selectedDifficulty) setSelectedDifficulty('All');
	// 	else if (filter.includes('min')) setSelectedMaxTime(null);
	// }, [selectedCategory, selectedDifficulty]);

	const renderRecipeCard = ({ item }: { item: Recipe }) => (
		<View style={styles.recipeCard}>
			<Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
			<View style={styles.recipeContent}>
				<ThemedText type='defaultSemiBold' style={styles.recipeName} numberOfLines={1}>{item.title + item.id}</ThemedText>
				<View style={styles.recipeMeta}>
					<ThemedText type='defaultSemiBold' style={styles.recipeCategory}>{item.category}</ThemedText>
					<ThemedText style={styles.recipeTime}>⏱️ {item.cookingTime}min</ThemedText>
				</View>
				<ThemedText style={styles.recipeDifficulty}>{item.difficulty}</ThemedText>
				<ThemedText style={styles.recipeDescription} numberOfLines={2}>{item.description}</ThemedText>
			</View>
		</View>
	);

	return (
		<FlatList
			data={filteredRecipes}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderRecipeCard}
			contentContainerStyle={styles.recipeList}
			horizontal={false}
			showsHorizontalScrollIndicator={false}
			numColumns={2}
			ListHeaderComponent={
				<>
					<View style={styles.searchContainer}>
						<TextInput
							style={styles.searchInput}
							placeholder="Tìm kiếm món ăn ngon..."
							value={searchTerm}
							onChangeText={setSearchTerm}
							placeholderTextColor="#9CA3AF"
						/>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.filtersContainer}
					>
						{['All', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng', 'Ăn vặt'].map(category => (
							<TouchableOpacity
								key={category}
								style={[
									styles.filterPill,
									selectedCategory === category && styles.filterPillActive
								]}
								onPress={() => setSelectedCategory(category)}
							>
								<ThemedText style={[
									styles.filterPillText,
									selectedCategory === category && styles.filterPillTextActive]}>
									{category}
								</ThemedText>
							</TouchableOpacity>
						))}
					</ScrollView>

					<View style={styles.secondaryFilters}>
						<View style={styles.filterRow}>
							<ThemedText style={styles.filterLabel}>Độ khó:</ThemedText>
							{['All', 'Cơ bản', 'Quen tay', 'Đầu bếp'].map(difficulty => (
								<TouchableOpacity
									key={difficulty}
									style={[
										styles.toggleButton,
										// selectedDifficulty === difficulty && styles.toggleButtonActive
									]}
									onPress={() => setSelectedDifficulty(1)}
								>
									<ThemedText style={[
										styles.toggleButtonText,
										// selectedDifficulty === difficulty && styles.toggleButtonTextActive
									]}>
										{difficulty}
									</ThemedText>
								</TouchableOpacity>
							))}
						</View>

						<View style={styles.filterRow}>
							<ThemedText style={styles.filterLabel}>Thời gian:</ThemedText>
							{[15, 30, 60].map(time => (
								<TouchableOpacity
									key={time}
									style={[
										styles.toggleButton,
										selectedMaxTime === time && styles.toggleButtonActive
									]}
									onPress={() => setSelectedMaxTime(selectedMaxTime === time ? null : time)}
								>
									<ThemedText style={[
										styles.toggleButtonText,
										selectedMaxTime === time && styles.toggleButtonTextActive
									]}>
										{time} phút
									</ThemedText>
								</TouchableOpacity>
							))}
							<TouchableOpacity
								style={[
									styles.toggleButton,
									selectedMaxTime === null && styles.toggleButtonActive
								]}
								onPress={() => setSelectedMaxTime(null)}
							>
								<ThemedText style={[
									styles.toggleButtonText,
									selectedMaxTime === null && styles.toggleButtonTextActive
								]}>
									Any
								</ThemedText>
							</TouchableOpacity>
						</View>
					</View>

					{/* {activeFilters.length > 0 && (
						<View style={styles.activeFiltersContainer}>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.activeFiltersScrollContainer}>
								{activeFilters.map(filter => (
									<TouchableOpacity
										key={filter}
										style={styles.activeFilterTag}
										onPress={() => removeFilter(filter)}
									>
										<ThemedText style={styles.activeFilterText}>{filter}</ThemedText>
										<ThemedText style={styles.removeIcon}>✕</ThemedText>
									</TouchableOpacity>
								))}
							</ScrollView>
							<TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
								<ThemedText style={styles.clearButtonText}>Clear all</ThemedText>
							</TouchableOpacity>
						</View>
					)} */}


					<ThemedText style={styles.recipeCount}>
						Hiển thị {filteredRecipes.length} trên {total} công thức
					</ThemedText>
				</>
			}
			ListEmptyComponent={
				<View style={styles.listEmptyContainer}>
					<ThemedText style={styles.emptyEmoji}>🍽️</ThemedText>
					<ThemedText type='defaultSemiBold' style={styles.emptyTitle}>Không tìm thấy công thức</ThemedText>
					<ThemedText style={styles.emptyMessage}>
						Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm kết quả.
					</ThemedText>
				</View>
			}
			ListFooterComponent={
				<>
					{filteredRecipes.length > 0 && (
						<View style={styles.footerContainer}>
							<TouchableOpacity
								style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]}
								onPress={() => setPage(prev => Math.max(1, prev - 1))}
								disabled={page <= 1}
							>
								<ThemedText style={[styles.pageButtonText, page <= 1 && styles.pageButtonTextDisabled]}>
									Trước
								</ThemedText>
							</TouchableOpacity>
							<ThemedText style={styles.pageIndicator}>Trang {page}</ThemedText>
							<TouchableOpacity
								style={[styles.pageButton, page >= totalPage && styles.pageButtonDisabled]}
								onPress={() => setPage(prev => prev + 1)}
								disabled={page >= totalPage}
							>
								<ThemedText style={[styles.pageButtonText, page >= totalPage && styles.pageButtonTextDisabled]}>Tiếp</ThemedText>
							</TouchableOpacity>
						</View>
					)}

				</>
			}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF7ED',
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	searchInput: {
		height: 44,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		backgroundColor: '#F9FAFB',
		color: '#111827',
	},
	filtersContainer: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	filterPill: {
		backgroundColor: '#E5E7EB',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#D1D5DB',
	},
	filterPillActive: {
		backgroundColor: '#F97316',
		borderColor: '#F97316',
	},
	filterPillText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#374151',
	},
	filterPillTextActive: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	secondaryFilters: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	filterRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	filterLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#374151',
		minWidth: 70,
	},
	toggleButton: {
		backgroundColor: '#E5E7EB',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#D1D5DB',
	},
	toggleButtonActive: {
		backgroundColor: '#F97316',
		borderColor: '#F97316',
	},
	toggleButtonText: {
		fontSize: 12,
		fontWeight: '500',
		color: '#374151',
	},
	toggleButtonTextActive: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	activeFiltersContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
		gap: 10,
	},
	activeFiltersScrollContainer: {
		gap: 10
	},
	activeFilterTag: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FEF3C7',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 12,
		gap: 5,
		borderWidth: 1,
		borderColor: '#FCD34D',
	},
	activeFilterText: {
		fontSize: 12,
		color: '#92400E',
		fontWeight: '500',
	},
	removeIcon: {
		fontSize: 14,
		color: '#92400E',
		fontWeight: 'bold',
	},
	clearButton: {
		marginLeft: 'auto',
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	clearButtonText: {
		fontSize: 13,
		color: '#F97316',
		fontWeight: '600',
	},
	recipeCount: {
		fontSize: 14,
		color: '#6B7280',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#FFFFFF',
		fontWeight: '500',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	recipeList: {

	},
	recipeCard: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		margin: 4,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
	},
	recipeImage: {
		width: '100%',
		height: 140,
		resizeMode: 'cover',
		backgroundColor: '#E5E7EB',
	},
	recipeContent: {
		padding: 12,
	},
	recipeName: {
		fontSize: 15,
		color: '#111827',
		marginBottom: 6,
	},
	recipeMeta: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	recipeCategory: {
		fontSize: 12,
		color: '#F97316',
		backgroundColor: '#FEF3C7',
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
	},
	recipeTime: {
		fontSize: 12,
		color: '#6B7280',
		fontWeight: '500',
	},
	recipeDifficulty: {
		fontSize: 12,
		color: '#059669',
		fontWeight: '600',
		marginBottom: 6,
	},
	recipeDescription: {
		fontSize: 12,
		color: '#6B7280',
		lineHeight: 16,
		fontWeight: '400',
	},
	listEmptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		paddingVertical: 60,
	},
	emptyEmoji: {
		fontSize: 56,
		marginBottom: 20,
	},
	emptyTitle: {
		fontSize: 20,

		color: '#374151',
		marginBottom: 10,
		textAlign: 'center',
	},
	emptyMessage: {
		fontSize: 16,
		color: '#6B7280',
		textAlign: 'center',
		lineHeight: 24,
		fontWeight: '400',
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB',
		gap: 20,
	},
	pageButton: {
		backgroundColor: '#F97316',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		minWidth: 80,
		alignItems: 'center',
	},
	pageButtonDisabled: {
		backgroundColor: '#E5E7EB',
	},
	pageButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	pageButtonTextDisabled: {
		color: '#9CA3AF',
	},
	pageIndicator: {
		fontSize: 16,
		fontWeight: '600',
		color: '#374151',
	},
})